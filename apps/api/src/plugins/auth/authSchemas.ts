import Joi from "joi";
import { Nil } from "../../types";

// @todo check if it's possible to infer this type
export type LoginPayloadSchema = {
  email: string;
  password: string;
};
export const loginPayloadSchema = Joi.object<LoginPayloadSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export type MeAuthSchema = {
  id: string;
  validUntil: Date;
  userId: number;
  user: {
    id: number;
    name: Nil<string>;
    email: string;
    role: string;
  };
};
export const meAuthSchema = Joi.object<MeAuthSchema>({
  id: Joi.string().required(),
  validUntil: Joi.date().required(),
  userId: Joi.number().required(),
  user: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().optional().allow(""),
    email: Joi.string().required(),
    role: Joi.string().required(),
  }).required(),
});

export type MeAuthResponseSchema = {
  data: MeAuthSchema;
};
export const meAuthResponseSchema = Joi.object<MeAuthResponseSchema>({
  data: meAuthSchema.required().allow(null),
}).required();
