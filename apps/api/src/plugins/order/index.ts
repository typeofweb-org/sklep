import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { InputJsonObject } from '@prisma/client';
import type { SklepTypes } from '@sklep/types';
import { isNil } from 'ramda';
import Stripe from 'stripe';

import type { Models } from '../../models';
import { Enums } from '../../models';

import {
  createOrder,
  findOrderById,
  handleStripeEvent,
  getAllOrders,
  updateOrder,
} from './orderFunctions';
import {
  updateOrderParamsSchema,
  updateOrderPayloadSchema,
  updateOrderResponseSchema,
  getAllOrdersResponseSchema,
  getOrderByIdParamsSchema,
  getOrderByIdResponseSchema,
  initiateStripePaymentResponse,
  getAllOrdersRequestSchema,
} from './orderSchemas';

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
  name: 'sklepOrder',
  version: '1.0.0',
  register(server, options) {
    const stripe = new Stripe(options.stripeApiKey, {
      apiVersion: '2020-08-27',
      typescript: true,
    });

    server.event(ORDER_CREATED_EVENT);

    server.route({
      method: 'GET',
      path: '/{orderId}',
      options: {
        tags: ['api', 'order'],
        validate: {
          params: getOrderByIdParamsSchema,
        },
        response: {
          schema: getOrderByIdResponseSchema,
        },
        auth: false,
      },
      async handler(request) {
        const { orderId } = request.params as SklepTypes['getOrdersOrderIdRequestPathParams'];

        const order = await findOrderById(request, { orderId });

        if (!order) {
          throw Boom.notFound('Order not found');
        }
        return { data: order };
      },
    });

    server.route({
      method: 'PATCH',
      path: '/initiate-stripe-payment',
      options: {
        tags: ['api', 'order', 'stripe'],
        response: {
          schema: initiateStripePaymentResponse,
        },
        auth: false,
      },
      async handler(request) {
        const cart = await request.server.plugins.sklepCart.findCart(request);
        if (!cart) {
          throw Boom.badRequest('INVALID_CART');
        }

        const totals = request.server.plugins.sklepCart.calculateCartTotals(cart);
        const cartTotal = totals.discountSubTotal;

        const cartJson = JSON.parse(
          JSON.stringify(request.server.plugins.sklepCart.cartModelToResponse(cart)),
        ) as InputJsonObject;

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

    server.route({
      method: 'PUT',
      path: '/{orderId}',
      options: {
        tags: ['api', 'orders'],
        auth: {
          scope: [Enums.UserRole.ADMIN],
        },
        validate: {
          payload: updateOrderPayloadSchema,
          params: updateOrderParamsSchema,
        },
        response: {
          schema: updateOrderResponseSchema,
        },
      },

      async handler(request) {
        const { orderId } = request.params as SklepTypes['putOrdersOrderIdRequestPathParams'];
        const payload = request.payload as SklepTypes['putOrdersOrderIdRequestBody'];

        const order = await findOrderById(request, { orderId });

        if (!order) {
          throw Boom.notFound('Order not found');
        }

        const updatedOrder = await updateOrder(request, {
          id: orderId,
          status: payload.status,
        });

        return { data: updatedOrder };
      },
    });

    server.route({
      method: 'GET',
      path: '/',
      options: {
        tags: ['api', 'orders'],
        auth: {
          scope: [Enums.UserRole.ADMIN],
        },
        response: {
          schema: getAllOrdersResponseSchema,
        },
        validate: {
          query: getAllOrdersRequestSchema,
        },
      },
      async handler(request) {
        const { take, skip } = request.query as SklepTypes['getOrdersRequestQuery'];

        if (isNil(take) !== isNil(skip)) {
          throw Boom.badRequest();
        }

        const orders = await getAllOrders(request, { take, skip });
        const total = await request.server.app.db.order.count();

        return {
          data: orders,
          meta: { total },
        };
      },
    });
  },
};
