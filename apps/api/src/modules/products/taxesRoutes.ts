import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';

import { Enums } from '../../models';

import {
  addTaxPayloadSchema,
  addTaxResponseSchema,
  editTaxParamsSchema,
  editTaxPayloadSchema,
  editTaxResponseSchema,
  getTaxesResponseSchema,
  getTaxParamsSchema,
  getTaxResponseSchema,
} from './taxesSchemas';

const taxSelect = {
  id: true,
  name: true,
  taxRate: true,
  createdAt: false,
  updatedAt: false,
} as const;

export const addTaxRoute: Hapi.ServerRoute = {
  method: 'POST',
  path: '/taxes',
  options: {
    tags: ['api', 'taxes'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: addTaxPayloadSchema,
    },
    response: {
      schema: addTaxResponseSchema,
    },
  },
  async handler(request): Promise<SklepTypes['postTaxes200Response']> {
    const payload = request.payload as SklepTypes['postTaxesRequestBody'];
    const tax = await request.server.app.db.tax.create({
      data: {
        ...payload,
      },
      select: taxSelect,
    });
    return { data: tax };
  },
};

export const getTaxesRoute: Hapi.ServerRoute = {
  method: 'GET',
  path: '/taxes',
  options: {
    tags: ['api', 'taxes'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    response: {
      schema: getTaxesResponseSchema,
    },
  },
  async handler(request): Promise<SklepTypes['getTaxes200Response']> {
    const taxes = await request.server.app.db.tax.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      select: taxSelect,
    });

    return { data: taxes };
  },
};

export const getTaxRoute: Hapi.ServerRoute = {
  method: 'GET',
  path: '/taxes/{taxIdOrName}',
  options: {
    tags: ['api', 'taxes'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    response: {
      schema: getTaxResponseSchema,
    },
    validate: {
      params: getTaxParamsSchema,
    },
  },
  async handler(request): Promise<SklepTypes['getTaxesTaxIdOrName200Response']> {
    const params = request.params as SklepTypes['getTaxesTaxIdOrNameRequestPathParams'];

    const maybeId = Number(params.taxIdOrName);
    const query = Number.isNaN(maybeId)
      ? { name: params.taxIdOrName as string }
      : { id: params.taxIdOrName as number };

    const tax = await request.server.app.db.tax.findFirst({
      where: {
        ...query,
      },
      select: taxSelect,
      take: 1,
    });

    if (!tax) {
      throw Boom.notFound('Tax not found.');
    }

    return { data: tax };
  },
};

export const editTaxRoute: Hapi.ServerRoute = {
  method: 'PUT',
  path: '/taxes/{taxId}',
  options: {
    tags: ['api', 'taxes'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: editTaxPayloadSchema,
      params: editTaxParamsSchema,
    },
    response: {
      schema: editTaxResponseSchema,
    },
  },
  async handler(request): Promise<SklepTypes['putTaxesTaxId200Response']> {
    const payload = request.payload as SklepTypes['putTaxesTaxIdRequestBody'];
    const params = request.params as SklepTypes['putTaxesTaxIdRequestPathParams'];

    const count = await request.server.app.db.tax.count({ where: { id: params.taxId } });
    if (!count) {
      throw Boom.notFound('Tax not found.');
    }

    const tax = await request.server.app.db.tax.update({
      where: {
        id: params.taxId,
      },
      data: {
        ...payload,
      },
      select: taxSelect,
    });

    return { data: tax };
  },
};

export const deleteTaxRoute: Hapi.ServerRoute = {
  method: 'DELETE',
  path: '/taxes/{taxId}',
  options: {
    tags: ['api', 'taxes'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      params: editTaxParamsSchema,
    },
  },
  async handler(request) {
    const params = request.params as SklepTypes['deleteTaxesTaxIdRequestPathParams'];

    const count = await request.server.app.db.tax.count({ where: { id: params.taxId } });
    if (!count) {
      return null;
    }

    await request.server.app.db.tax.delete({ where: { id: params.taxId } });
    return null;
  },
};
