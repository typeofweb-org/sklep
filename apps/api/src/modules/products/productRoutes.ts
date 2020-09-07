import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { SklepTypes } from '@sklep/types';
import Slugify from 'slugify';

import { Enums } from '../../models';

import {
  addProductPayloadSchema,
  addProductResponseSchema,
  editProductParamsSchema,
  editProductPayloadSchema,
  getProductResponseSchema,
} from './productSchemas';

function handlePrismaError(err: any) {
  console.log(err);

  throw err;
}

const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  isPublic: true,
  regularPrice: true,
  discountPrice: true,
  type: true,
  userId: false,
  createdAt: false,
  updatedAt: false,
} as const;

export const addProductRoute: Hapi.ServerRoute = {
  method: 'POST',
  path: '/products',
  options: {
    tags: ['api', 'products'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: addProductPayloadSchema,
    },
    response: {
      schema: addProductResponseSchema,
    },
  },
  async handler(request) {
    const payload = request.payload as SklepTypes['postProductsRequestBody'];
    const user = request.auth.credentials!.session!.user;

    const slug = Slugify(payload.name);

    const product = await request.server.app.db.product.create({
      data: {
        ...payload,
        slug,
        addedBy: {
          connect: {
            id: user.id,
          },
        },
      },
      select: productSelect,
    });

    return { data: product };
  },
};

export const editProductRoute: Hapi.ServerRoute = {
  method: 'PUT',
  path: '/products/{productId}',
  options: {
    tags: ['api', 'products'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      payload: editProductPayloadSchema,
      params: editProductParamsSchema,
    },
  },
  async handler(request) {
    const payload = request.payload as SklepTypes['putProductsProductIdRequestBody'];
    const params = request.params as SklepTypes['putProductsProductIdRequestPathParams'];

    const count = await request.server.app.db.product.count({ where: { id: params.productId } });
    if (!count) {
      throw Boom.notFound();
    }

    const slug = Slugify(payload.name);

    const product = await request.server.app.db.product
      .update({
        where: {
          id: params.productId,
        },
        data: {
          ...payload,
          slug,
        },
      })
      .catch(handlePrismaError);

    return { data: product };
  },
};

export const deleteProductRoute: Hapi.ServerRoute = {
  method: 'DELETE',
  path: '/products/{productId}',
  options: {
    tags: ['api', 'products'],
    auth: {
      scope: Enums.UserRole.ADMIN,
    },
    validate: {
      params: editProductParamsSchema,
    },
  },
  async handler(request) {
    const params = request.params as SklepTypes['deleteProductsProductIdRequestPathParams'];

    const count = await request.server.app.db.product.count({ where: { id: params.productId } });
    if (!count) {
      return null;
    }

    await request.server.app.db.product.delete({ where: { id: params.productId } });
    return null;
  },
};

export const getProductsRoute: Hapi.ServerRoute = {
  method: 'GET',
  path: '/products',
  options: {
    tags: ['api', 'products'],
    auth: {
      mode: 'try',
    },
    response: {
      schema: getProductResponseSchema,
    },
  },
  async handler(request): Promise<SklepTypes['getProducts200Response']> {
    const user = request.auth.credentials?.session?.user;
    const isAdmin = user?.role === Enums.UserRole.ADMIN;

    const products = await request.server.app.db.product.findMany({
      ...(!isAdmin && {
        where: {
          isPublic: true,
        },
      }),
      select: productSelect,
    });

    return { data: products };
  },
};
