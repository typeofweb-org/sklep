import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import ms from 'ms';

import { isProd } from '../../config';
import { Enums } from '../../models';

import {
  addToCart,
  cartModelToResponse,
  clearCart,
  ensureCartExists,
  findAllCarts,
  findOrCreateCart,
  removeFromCart,
} from './cartFunctions';
import {
  addToCartPayloadSchema,
  createCartResponseSchema,
  getAllCartsResponseSchema,
  removeFromCartPayloadSchema,
} from './cartSchemas';

declare module '@hapi/hapi' {
  interface PluginsStates {
    readonly cart: {
      readonly findOrCreateCart: typeof findOrCreateCart;
      readonly addToCart: typeof addToCart;
      readonly removeFromCart: typeof removeFromCart;
      readonly clearCart: typeof clearCart;
    };
  }
}

export const CartPlugin: Hapi.Plugin<{ readonly cookiePassword: string }> = {
  multiple: false,
  name: 'Sklep Cart Plugin',
  version: '1.0.0',
  register(server, options) {
    server.expose('findOrCreateCart', findOrCreateCart);
    server.expose('addToCart', addToCart);
    server.expose('removeFromCart', removeFromCart);
    server.expose('clearCart', clearCart);

    server.state('cart', {
      ttl: ms('3 months'),
      isSecure: isProd(),
      isHttpOnly: true,
      isSameSite: 'Lax',
      encoding: 'iron',
      password: options.cookiePassword,
      clearInvalid: true,
      strictHeader: true,
    });

    server.route({
      method: 'POST',
      path: '/',
      options: {
        tags: ['api', 'cart'],
        auth: false,
        response: {
          schema: createCartResponseSchema,
        },
      },
      async handler(request, h): Promise<SklepTypes['postCart200Response']> {
        const cart = await ensureCartExists(request, h);

        return {
          data: cartModelToResponse(cart),
        };
      },
    });

    server.route({
      method: 'PATCH',
      path: '/add',
      options: {
        tags: ['api', 'cart'],
        auth: false,
        validate: {
          payload: addToCartPayloadSchema,
        },
      },
      async handler(request, h) {
        const cart = await ensureCartExists(request, h);

        const { quantity, productId } = request.payload as SklepTypes['patchCartAddRequestBody'];

        await addToCart(request, { quantity, productId, cartId: cart.id });

        return null;
      },
    });

    server.route({
      method: 'PATCH',
      path: '/remove',
      options: {
        tags: ['api', 'cart'],
        auth: false,
        validate: {
          payload: removeFromCartPayloadSchema,
        },
      },
      async handler(request, h) {
        const cart = await ensureCartExists(request, h);

        const { productId } = request.payload as SklepTypes['patchCartRemoveRequestBody'];

        await removeFromCart(request, { productId, cartId: cart.id });

        return null;
      },
    });

    server.route({
      method: 'PATCH',
      path: '/clear',
      options: {
        tags: ['api', 'cart'],
        auth: false,
        validate: {},
      },
      async handler(request, h) {
        const cart = await ensureCartExists(request, h);

        await clearCart(request, { cartId: cart.id });

        return null;
      },
    });

    server.route({
      method: 'GET',
      path: '/all',
      options: {
        tags: ['api', 'cart'],
        auth: {
          scope: [Enums.UserRole.ADMIN],
        },
        response: {
          schema: getAllCartsResponseSchema,
        },
      },
      async handler(request) {
        const carts = await findAllCarts(request);

        return {
          data: carts.map(cartModelToResponse),
        };
      },
    });
  },
};
