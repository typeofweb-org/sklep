import Joi from 'joi';

export const taxRateSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  value: Joi.number().required(),
});

export const getAllTaxRatesResponseSchema = Joi.object({
  data: Joi.array().items(taxRateSchema.optional()).required(),
});

export const addTaxRatePayloadSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
}).required();

export const addTaxRateResponseSchema = Joi.object({
  data: taxRateSchema.required(),
}).required();

export const editTaxRateResponseSchema = Joi.object({
  data: taxRateSchema.required(),
}).required();

export const editTaxRatePayloadSchema = addTaxRatePayloadSchema;

export const editTaxRateParamsSchema = Joi.object({
  taxRateId: Joi.number().required(),
}).required();

export const removeTaxRateParamsSchema = Joi.object({
  taxRateId: Joi.number().required(),
}).required();
