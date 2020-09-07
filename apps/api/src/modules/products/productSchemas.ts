import { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';

const productSchema = Joi.object({
  id: Joi.number().required(),
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional().allow(null, ''),
  isPublic: Joi.boolean().required(),
  regularPrice: Joi.number().required(),
  discountPrice: Joi.number().optional().allow(null),
  type: Joi.string()
    .valid(...Object.keys(Enums.ProductType))
    .required(),
});

export const addProductPayloadSchema = Joi.object<SklepTypes['postProductsRequestBody']>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  regularPrice: Joi.number().required(),
  discountPrice: Joi.number().optional().allow(null),
  type: Joi.string()
    .valid(...Object.keys(Enums.ProductType))
    .required(),
}).required();

export const addProductResponseSchema = Joi.object<SklepTypes['postProducts200Response']>({
  data: productSchema.required(),
});

export const editProductPayloadSchema = addProductPayloadSchema;

export const editProductParamsSchema = Joi.object({
  productId: Joi.number().required(),
}).required();

export const getProductResponseSchema = Joi.object<SklepTypes['getProducts200Response']>({
  data: Joi.array().items(productSchema.optional()).required(),
}).required();
