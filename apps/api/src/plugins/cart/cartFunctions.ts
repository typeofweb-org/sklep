import { Request } from '@hapi/hapi';

const cartSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  cartProducts: {
    select: {
      productId: true,
      quantity: true,
    },
  },
} as const;

export async function findOrCreateCart(request: Request) {
  const cartId = request.state['cart'];

  if (cartId) {
    const [cart] = await request.server.app.db.cart.findMany({
      where: { id: cartId },
      select: cartSelect,
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

export async function addToCart(
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

export async function removeFromCart(
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

export async function clearCart(request: Request, { cartId }: { cartId: string }) {
  return request.server.app.db.cartToProduct.deleteMany({
    where: {
      cartId,
    },
  });
}
