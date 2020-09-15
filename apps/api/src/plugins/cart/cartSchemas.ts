import Joi from 'joi';

import { SklepTypes } from '../../../../types/index';

export const addToCartPayloadSchema = Joi.object<SklepTypes['patchCartAddRequestBody']>({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

export const removeFromCartPayloadSchema = Joi.object<SklepTypes['patchCartRemoveRequestBody']>({
  productId: Joi.number().integer().required(),
}).required();

export const createCartResponseSchema = Joi.object<SklepTypes['postCart200Response']>({
  data: Joi.object({
    id: Joi.string().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
    cartProducts: Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().integer().required(),
          quantity: Joi.number().integer().required(),
        }).optional(),
      )
      .required(),
  }).required(),
}).required();
