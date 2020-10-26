import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';

export const initiateStripePaymentResponse = Joi.object<
  SklepTypes['patchOrdersInitiateStripePayment200Response']
>({
  data: Joi.object({
    orderId: Joi.string().required(),
    stripeClientSecret: Joi.string().required(),
  }).required(),
}).required();

export const getOrderByIdParamsSchema = Joi.object<SklepTypes['getOrdersOrderIdRequestPathParams']>(
  {
    orderId: Joi.string().required(),
  },
).required();

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

export const updateOrderResponseSchema = getOrderByIdResponseSchema;

export const updateOrderPayloadSchema = Joi.object<SklepTypes['putOrdersOrdersOrderIdRequestBody']>(
  {
    status: Joi.string()
      .valid(...Object.keys(Enums.OrderStatus))
      .required(),
  },
).required();

export const updateOrderParamsSchema = Joi.object<
  SklepTypes['putOrdersOrdersOrderIdRequestPathParams']
>({
  orderId: Joi.string().required(),
}).required();
