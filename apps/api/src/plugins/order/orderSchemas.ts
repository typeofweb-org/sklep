import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';
import { cartResponseSchema } from '../cart/cartSchemas';

export const addressSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  streetName: Joi.string().required(),
  houseNumber: Joi.string().required(),
  apartmentNumber: Joi.string(),
  city: Joi.string().required(),
  zipCode: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

export const initiateStripePaymentResponse = Joi.object<
  SklepTypes['patchOrdersInitiateStripePayment200Response']
>({
  data: Joi.object({
    orderId: Joi.string().required(),
    stripeClientSecret: Joi.string().required(),
  }).required(),
}).required();

export const orderResponseSchema = Joi.object({
  id: Joi.string().required(),
  cart: cartResponseSchema.required(),
  total: Joi.number().required(),
  status: Joi.string()
    .valid(...Object.keys(Enums.OrderStatus))
    .required(),
  address: addressSchema.required(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
}).required();

export const getAllOrdersQuerySchema = Joi.object({
  take: Joi.number().integer(),
  skip: Joi.number().integer(),
});

export const getAllOrdersResponseSchema = Joi.object<SklepTypes['getOrders200Response']>({
  data: Joi.array().items(orderResponseSchema.optional()).required(),
  meta: Joi.object({
    total: Joi.number().integer().required(),
  }).required(),
}).required();

export const getOrderByIdParamsSchema = Joi.object<SklepTypes['getOrdersOrderIdRequestPathParams']>(
  {
    orderId: Joi.string().required(),
  },
);
export const getOrderByIdResponseSchema = Joi.object<SklepTypes['getOrdersOrderId200Response']>({
  data: orderResponseSchema.required(),
}).required();

export const updateOrderResponseSchema = getOrderByIdResponseSchema;

export const updateOrderPayloadSchema = Joi.object<SklepTypes['putOrdersOrderIdRequestBody']>({
  status: Joi.string()
    .valid(...Object.keys(Enums.OrderStatus))
    .required(),
}).required();

export const updateOrderParamsSchema = Joi.object<SklepTypes['putOrdersOrderIdRequestPathParams']>({
  orderId: Joi.string().required(),
}).required();

export const getAllOrderStatusesSchema = Joi.object<SklepTypes['getOrdersStatuses200Response']>({
  data: Joi.array()
    .items(Joi.string().valid(...Object.values(Enums.OrderStatus)))
    .required(),
}).required();
