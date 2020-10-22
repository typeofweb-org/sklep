import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';
import { cartResponseSchema } from '../cart/cartSchemas';

export const initiateStripePaymentResponse = Joi.object<
  SklepTypes['patchOrdersInitiateStripePayment200Response']
>({
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

export const getOrderByIdParamsSchema = Joi.object<SklepTypes['getOrdersOrderIdRequestPathParams']>(
  {
    orderId: Joi.string().required(),
  },
);
export const getOrderByIdResponseSchema = Joi.object<SklepTypes['getOrdersOrderId200Response']>({
  data: Joi.object({
    id: Joi.string().required(),
    cart: Joi.object().unknown(true).required(),
    total: Joi.number().required(),
    status: Joi.string()
      .valid(...Object.keys(Enums.OrderStatus))
      .required(),
  }).required(),
}).required();
