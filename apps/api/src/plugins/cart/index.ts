import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import ms from 'ms';

import { isProd } from '../../config';

import {
  addToCart,
  calculateCartTotals,
  clearCart,
  findOrCreateCart,
  removeFromCart,
} from './cartFunctions';
import {
  addToCartPayloadSchema,
  createCartResponseSchema,
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
  async register(server, options) {
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
        const cart = await findOrCreateCart(request);
        h.state('cart', cart.id);

        const { regularSubTotal, discountSubTotal } = calculateCartTotals(cart);

        return {
          data: {
            ...cart,
            regularSubTotal,
            discountSubTotal,
            createdAt: cart.createdAt.toISOString(),
            updatedAt: cart.updatedAt.toISOString(),
          },
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
        const cart = await findOrCreateCart(request);
        h.state('cart', cart.id);

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
        const cart = await findOrCreateCart(request);
        h.state('cart', cart.id);

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
        const cart = await findOrCreateCart(request);
        h.state('cart', cart.id);

        await clearCart(request, { cartId: cart.id });

        return null;
      },
    });
  },
};
