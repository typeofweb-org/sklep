import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';

import { Enums } from '../../models';

import {
  addTaxRatePayloadSchema,
  addTaxRateResponseSchema,
  editTaxRateParamsSchema,
  editTaxRatePayloadSchema,
  editTaxRateResponseSchema,
  getAllTaxRatesResponseSchema,
} from './taxRateSchemas';

export const getAllTaxRatesRoute: Hapi.ServerRoute = {
  method: 'GET',
  path: '/tax-rates',
  options: {
    tags: ['api', 'products', 'tax-rates'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    response: {
      schema: getAllTaxRatesResponseSchema,
    },
  },
  async handler(request) {
    const taxRates = await request.server.app.db.taxRate.findMany();

    return { data: taxRates };
  },
};

export const addTaxRateRoute: Hapi.ServerRoute = {
  method: 'POST',
  path: '/tax-rates',
  options: {
    tags: ['api', 'products', 'tax-rates'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: addTaxRatePayloadSchema,
    },
    response: {
      schema: addTaxRateResponseSchema,
    },
  },
  async handler(request) {
    const payload = request.payload as SklepTypes['postTaxRatesRequestBody'];

    const taxRate = await request.server.app.db.taxRate.create({ data: payload });

    return { data: taxRate };
  },
};

export const editTaxRateRoute: Hapi.ServerRoute = {
  method: 'PUT',
  path: '/tax-rates/{taxRateId}',
  options: {
    tags: ['api', 'products', 'tax-rates'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: editTaxRatePayloadSchema,
      params: editTaxRateParamsSchema,
    },
    response: {
      schema: editTaxRateResponseSchema,
    },
  },
  async handler(request) {
    const payload = request.payload as SklepTypes['putTaxRatesTaxRateIdRequestBody'];
    const params = request.params as SklepTypes['putTaxRatesTaxRateIdRequestPathParams'];

    const taxRate = await request.server.app.db.taxRate.update({
      where: {
        id: params.taxRateId,
      },
      data: payload,
    });

    return { data: taxRate };
  },
};

export const removeTaxRateRoute: Hapi.ServerRoute = {
  method: 'DELETE',
  path: '/tax-rates/{taxRateId}',
  options: {
    tags: ['api', 'products', 'tax-rates'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      params: editTaxRateParamsSchema,
    },
  },
  async handler(request) {
    const params = request.params as SklepTypes['putTaxRatesTaxRateIdRequestPathParams'];

    await request.server.app.db.taxRate.delete({ where: { id: params.taxRateId } });

    return null;
  },
};
