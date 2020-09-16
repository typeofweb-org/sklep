import type { Request } from '@hapi/hapi';

import type { Awaited } from '../../types';

const cartSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  cartProducts: {
    select: {
      quantity: true,
      cartId: false,
      productId: false,
      createdAt: false,
      updatedAt: false,
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          regularPrice: true,
          discountPrice: true,
        },
      },
    },
  },
} as const;

export async function findOrCreateCart(request: Request) {
  const cartId = request.state['cart'];

  if (cartId) {
    const [cart] = await request.server.app.db.cart.findMany({
      where: { id: cartId },
      select: cartSelect,
      take: 1,
    });
    if (cart) {
      return cart;
    }
  }

  return request.server.app.db.cart.create({
    data: {},
    select: cartSelect,
  });
}

export function addToCart(
  request: Request,
  { cartId, quantity, productId }: { cartId: string; quantity: number; productId: number },
) {
  return request.server.app.db.cartToProduct.upsert({
    where: {
      cartId_productId: {
        cartId: cartId,
        productId: productId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      cart: {
        connect: {
          id: cartId,
        },
      },
      product: {
        connect: {
          id: productId,
        },
      },
      quantity,
    },
  });
}

export function removeFromCart(
  request: Request,
  { cartId, productId }: { cartId: string; productId: number },
) {
  return request.server.app.db.cartToProduct.deleteMany({
    where: {
      cartId,
      productId,
    },
  });
}

export function clearCart(request: Request, { cartId }: { cartId: string }) {
  return request.server.app.db.cartToProduct.deleteMany({
    where: {
      cartId,
    },
  });
}

export function calculateCartTotals(cart: Awaited<ReturnType<typeof findOrCreateCart>>) {
  return cart.cartProducts.reduce(
    (acc, cartProduct) => {
      const regularSum = cartProduct.product.regularPrice * cartProduct.quantity;
      const discountSum =
        (cartProduct.product.discountPrice ?? cartProduct.product.regularPrice) *
        cartProduct.quantity;

      acc.regularSubTotal += Math.trunc(regularSum);
      acc.discountSubTotal += Math.trunc(discountSum);
      return acc;
    },
    {
      regularSubTotal: 0,
      discountSubTotal: 0,
    },
  );
}
