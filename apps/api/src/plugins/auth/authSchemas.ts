import type { SklepTypes } from '@sklep/types';
import Joi from 'joi';

import { Enums } from '../../models';

export const loginPayloadSchema = Joi.object<SklepTypes['postAuthLoginRequestBody']>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerPayloadSchema = Joi.object<SklepTypes['postAuthRegisterRequestBody']>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const meAuthSchema = Joi.object<SklepTypes['getAuthMe200Response']['data']>({
  id: Joi.string().required(),
  validUntil: Joi.date().required(),
  userId: Joi.number().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  user: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().optional().allow('', null),
    email: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.keys(Enums.UserRole))
      .required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  }).required(),
});

export const meAuthResponseSchema = Joi.object<SklepTypes['getAuthMe200Response']>({
  data: meAuthSchema.required().allow(null),
}).required();
