import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { InputJsonObject } from '@prisma/client';
import Stripe from 'stripe';

import type { Models } from '../../models';

import { createOrder, handleStripeEvent } from './orderFunctions';
import { initiateStripePaymentResponse } from './orderSchemas';

const ORDER_CREATED_EVENT = 'order:order:created';

declare module '@hapi/hapi' {
  interface ServerEvents {
    on(
      criteria: typeof ORDER_CREATED_EVENT | ServerEventCriteria<typeof ORDER_CREATED_EVENT>,
      listener: (order: Models['order']) => void,
    ): void;
  }
}

export const OrderPlugin: Hapi.Plugin<{ readonly stripeApiKey: string }> = {
  multiple: false,
  name: 'Sklep Order Plugin',
  version: '1.0.0',
  register(server, options) {
    const stripe = new Stripe(options.stripeApiKey, {
      apiVersion: '2020-08-27',
      typescript: true,
    });

    server.event(ORDER_CREATED_EVENT);

    server.route({
      method: 'PATCH',
      path: '/initiate-stripe-payment',
      options: {
        tags: ['api', 'order', 'stripe'],
        response: {
          schema: initiateStripePaymentResponse,
        },
      },
      async handler(request) {
        const cart = await request.server.plugins.cart.findCart(request);
        if (!cart) {
          throw Boom.badRequest('INVALID_CART');
        }

        const totals = request.server.plugins.cart.calculateCartTotals(cart);
        const cartTotal = totals.discountSubTotal;

        const cartJson = JSON.parse(JSON.stringify(cart)) as InputJsonObject;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: cartTotal,
          currency: 'pln',
        });

        const order = await createOrder(request, {
          cartJson,
          cartTotal,
          paymentIntentId: paymentIntent.id,
        });

        return {
          data: {
            orderId: order.id,
            stripeClientSecret: paymentIntent.client_secret,
          },
        };
      },
    });

    server.route({
      method: 'POST',
      path: '/stripe/webhook',
      options: {
        tags: ['api', 'order', 'stripe', 'webhook'],
        response: {
          emptyStatusCode: 200, // Stripe requires 200
        },
      },
      async handler(request) {
        const event = request.payload as Stripe.Event;

        await handleStripeEvent(request, event);

        return null;
      },
    });
  },
};
