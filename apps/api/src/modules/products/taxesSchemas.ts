import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

export const taxSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  taxRate: Joi.number().required(),
});

export const addTaxResponseSchema = Joi.object({
  data: taxSchema.required(),
}).required();

export const addTaxPayloadSchema = Joi.object({
  name: Joi.string().required(),
  taxRate: Joi.number().required(),
}).required();

export const getTaxesResponseSchema = Joi.object<SklepTypes['getTaxes200Response']>({
  data: Joi.array().items(taxSchema.optional()).required(),
}).required();

export const getTaxParamsSchema = Joi.object({
  taxIdOrName: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
}).required();

export const getTaxResponseSchema = Joi.object<SklepTypes['getTaxesTaxIdOrName200Response']>({
  data: taxSchema.required(),
}).required();

export const editTaxPayloadSchema = addTaxPayloadSchema;

export const editTaxParamsSchema = Joi.object({
  taxId: Joi.number().required(),
}).required();

export const editTaxResponseSchema = Joi.object<SklepTypes['putTaxesTaxId200Response']>({
  data: taxSchema.required(),
}).required();
