import { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';

export const addProductPayloadSchema = Joi.object<SklepTypes['postProductsRequestBody']>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  regularPrice: Joi.number().required(),
  discountPrice: Joi.number().optional().allow(null),
  type: Joi.string()
    .valid(...Object.keys(Enums.ProductType))
    .required(),
});
