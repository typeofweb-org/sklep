import Joi from 'joi';

export const initiateStripePaymentResponse = Joi.object({
  data: Joi.object({
    orderId: Joi.string().required(),
    stripeClientSecret: Joi.string().required(),
  }).required(),
}).required();
