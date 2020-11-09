import type { Request, ResponseToolkit } from '@hapi/hapi';
import { calculateCartTotals } from '@sklep/calculations';

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

type CartFromDB = Awaited<ReturnType<typeof findOrCreateCart>>['cart'];

export async function ensureCartExists(request: Request, h: ResponseToolkit) {
  const result = await findOrCreateCart(request);
  if (result.created) {
    h.state('cart', result.cart.id);
  }
  return result.cart;
}

export function findCart(request: Request) {
  const cartId: unknown = request.state['cart'];
  if (typeof cartId === 'string' && cartId.length > 0) {
    return request.server.app.db.cart.findFirst({
      where: { id: cartId },
      select: cartSelect,
    });
  }
  return null;
}

export async function findOrCreateCart(request: Request) {
  const existingCart = await findCart(request);

  if (existingCart) {
    return { cart: existingCart, created: false };
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

export function setProductQuantity(
  request: Request,
  {
    cartId,
    quantity,
    productId,
  }: { readonly cartId: string; readonly quantity: number; readonly productId: number },
) {
  return request.server.app.db.cartToProduct.update({
    where: {
      cartId_productId: {
        cartId: cartId,
        productId: productId,
      },
    },
    data: {
      quantity: {
        set: quantity,
      },
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

export function findAllCarts(request: Request) {
  return request.server.app.db.cart.findMany({
    select: cartSelect,
  });
}

export const cartModelToResponse = (cart: CartFromDB) => {
  const { regularSubTotal, discountSubTotal, totalQuantity } = calculateCartTotals(cart);

  return {
    ...cart,
    regularSubTotal,
    discountSubTotal,
    totalQuantity,
    createdAt: cart.createdAt.toISOString(),
    updatedAt: cart.updatedAt.toISOString(),
  };
};
