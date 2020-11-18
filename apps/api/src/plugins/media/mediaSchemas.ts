import Joi from 'joi';

const imageResponseSchema = Joi.object({
  id: Joi.number().required(),
  path: Joi.string().required(),
  alt: Joi.string().required(),
  description: Joi.string().optional(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
  productId: Joi.number().required(),
}).required();

export const deleteImageParamsSchema = Joi.object({
  imageId: Joi.number().required(),
}).required();

export const putImageParamsSchema = Joi.object({
  imageId: Joi.number().required(),
}).required();

export const putImagePayloadSchema = Joi.object({
  alt: Joi.string().required(),
  description: Joi.string().optional(),
  productId: Joi.number().required(),
}).required();

export const postImagePayloadSchema = Joi.object({
  file: Joi.any().meta({ swaggerType: 'file' }).description('file').required(),
  alt: Joi.string().required(),
  description: Joi.string().optional(),
}).required();
