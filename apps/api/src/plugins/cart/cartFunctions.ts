import type { Request, ResponseToolkit } from '@hapi/hapi';

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

export async function ensureCartExists(request: Request, h: ResponseToolkit) {
  const result = await findOrCreateCart(request);
  if (result.created) {
    h.state('cart', result.cart.id);
  }
  return result.cart;
}

export async function findOrCreateCart(request: Request) {
  const cartId = request.state['cart'];

  if (cartId) {
    const [cart] = await request.server.app.db.cart.findMany({
      where: { id: cartId },
      select: cartSelect,
      take: 1,
    });
    if (cart) {
      return { cart, created: false };
    }
  }

  const cart = await request.server.app.db.cart.create({
    data: {},
    select: cartSelect,
  });
  return { cart, created: true };
}

export function addToCart(
  request: Request,
  {
    cartId,
    quantity,
    productId,
  }: { readonly cartId: string; readonly quantity: number; readonly productId: number },
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
  { cartId, productId }: { readonly cartId: string; readonly productId: number },
) {
  return request.server.app.db.cartToProduct.deleteMany({
    where: {
      cartId,
      productId,
    },
  });
}

export function clearCart(request: Request, { cartId }: { readonly cartId: string }) {
  return request.server.app.db.cartToProduct.deleteMany({
    where: {
      cartId,
    },
  });
}

export function calculateCartTotals(cart: Awaited<ReturnType<typeof findOrCreateCart>>['cart']) {
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
