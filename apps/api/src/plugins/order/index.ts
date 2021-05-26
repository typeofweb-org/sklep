import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { Prisma } from '@prisma/client';
import { calculateCartTotals } from '@sklep/calculations';
import type { SklepTypes } from '@sklep/types';
import { isNil } from 'ramda';
import Stripe from 'stripe';

import { getConfig } from '../../config';
import type { Models } from '../../models';
import { Enums } from '../../models';

import {
  createOrder,
  findOrderById,
  handleStripeEvent,
  getAllOrders,
  updateOrder,
  getAllOrderStatuses,
} from './orderFunctions';
import {
  updateOrderParamsSchema,
  updateOrderPayloadSchema,
  updateOrderResponseSchema,
  getAllOrdersResponseSchema,
  getOrderByIdParamsSchema,
  getOrderByIdResponseSchema,
  initiateStripePaymentResponse,
  getAllOrdersQuerySchema,
  getAllOrderStatusesSchema,
  addressSchema,
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
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- params
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
        validate: {
          payload: addressSchema,
        },
      },
      async handler(request) {
        const cart = await request.server.plugins.sklepCart.findCart(request);
        if (!cart) {
          throw Boom.badRequest('INVALID_CART');
        }

        const totals = calculateCartTotals(cart);
        const cartTotal = totals.discountSubTotal;

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Json
        const cartJson = JSON.parse(
          JSON.stringify(request.server.plugins.sklepCart.cartModelToResponse(cart)),
        ) as Prisma.JsonValue;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: cartTotal,
          currency: 'pln',
        });

        const shippingAddress =
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- body
          request.payload as SklepTypes['patchOrdersInitiateStripePaymentRequestBody'];

        const order = await createOrder(request, {
          cartJson,
          cartTotal,
          paymentIntentId: paymentIntent.id,
          addressJson: shippingAddress,
        });

        return {
          data: {
            orderId: order.id,
            stripeClientSecret: paymentIntent.client_secret,
          },
        };
      },
    });

    const verifyStripeSignature: Hapi.Lifecycle.Method = (request) => {
      const signature = request.headers['stripe-signature'];
      if (!signature) {
        throw Boom.badData('Missing stripe-signature');
      }

      if (!Buffer.isBuffer(request.payload)) {
        throw Boom.internal('request.payload is not a Buffer');
      }

      try {
        return stripe.webhooks.constructEvent(
          request.payload,
          signature,
          getConfig('STRIPE_WEBHOOK_SECRET'),
        );
      } catch (err) {
        if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
          throw Boom.unauthorized('StripeSignatureVerificationError');
        }
        throw Boom.boomify(err);
      }
    };

    server.route({
      method: 'POST',
      path: '/stripe/webhook',
      options: {
        tags: ['api', 'order', 'stripe', 'webhook'],
        payload: {
          parse: false,
          output: 'data',
        },
        response: {
          emptyStatusCode: 200, // Stripe requires 200
        },
        auth: false,
        pre: [
          {
            method: verifyStripeSignature,
            assign: 'verifyStripeSignature',
          },
        ],
      },
      async handler(request) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Pre
        const event = request.pre.verifyStripeSignature as Stripe.Event;

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
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- params
        const { orderId } = request.params as SklepTypes['putOrdersOrderIdRequestPathParams'];
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- body
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
          query: getAllOrdersQuerySchema,
        },
      },
      async handler(request) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- query
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

    server.route({
      method: 'GET',
      path: '/statuses',
      options: {
        tags: ['api', 'orders'],
        response: {
          schema: getAllOrderStatusesSchema,
        },
      },
      handler() {
        const orderStatuses = getAllOrderStatuses();

        return {
          data: orderStatuses,
        };
      },
    });
  },
};
