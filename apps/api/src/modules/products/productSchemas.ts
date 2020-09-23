import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';

const productSchema = Joi.object({
  id: Joi.number().required(),
  slug: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
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
}).required();

export const editProductResponseSchema = Joi.object<SklepTypes['putProductsProductId200Response']>({
  data: productSchema.required(),
}).required();

export const editProductPayloadSchema = addProductPayloadSchema;

export const editProductParamsSchema = Joi.object({
  productId: Joi.number().required(),
}).required();

export const getProductParamsSchema = Joi.object({
  productId: Joi.number().required(),
}).required();

export const getProductResponseSchema = Joi.object<SklepTypes['getProducts200Response']>({
  data: productSchema.required(),
}).required();

export const getProductsResponseSchema = Joi.object<SklepTypes['getProducts200Response']>({
  data: Joi.array().items(productSchema.optional()).required(),
  meta: Joi.object({
    total: Joi.number().integer().required(),
  }).required(),
}).required();

export const getProductsQuerySchema = Joi.object<SklepTypes['getProductsRequestQuery']>({
  take: Joi.number().integer(),
  skip: Joi.number().integer(),
});
