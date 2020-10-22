import Joi from 'joi';

import { cartResponseSchema } from '../cart/cartSchemas';

export const initiateStripePaymentResponse = Joi.object({
  data: Joi.object({
    orderId: Joi.string().required(),
    stripeClientSecret: Joi.string().required(),
  }).required(),
}).required();

export const orderResponseSchema = Joi.object({
  id: Joi.number().required(),
  cart: cartResponseSchema.required(),
  total: Joi.number().required(),
  stripePaymentIntentId: Joi.string().required(),
  status: Joi.string().required(),
}).required();

export const getAllOrdersResponseSchema = Joi.object({
  data: Joi.array().items(orderResponseSchema.optional()).required(),
}).required();
