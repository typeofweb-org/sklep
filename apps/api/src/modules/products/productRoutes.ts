import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import { isNil } from 'ramda';
import Slugify from 'slugify';

import { Enums } from '../../models';

import {
  getProductParamsSchema,
  getProductResponseSchema,
  addProductPayloadSchema,
  addProductResponseSchema,
  editProductParamsSchema,
  editProductPayloadSchema,
  getProductsResponseSchema,
  getProductsQuerySchema,
  editProductResponseSchema,
} from './productSchemas';

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
    const user = request.auth.credentials.session!.user;

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
    response: {
      schema: editProductResponseSchema,
    },
  },
  async handler(request): Promise<SklepTypes['putProductsProductId200Response']> {
    const payload = request.payload as SklepTypes['putProductsProductIdRequestBody'];
    const params = request.params as SklepTypes['putProductsProductIdRequestPathParams'];

    const count = await request.server.app.db.product.count({ where: { id: params.productId } });
    if (!count) {
      throw Boom.notFound();
    }

    const slug = Slugify(payload.name);

    const product = await request.server.app.db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        ...payload,
        slug,
      },
      select: productSelect,
    });

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

export const getProductRoute: Hapi.ServerRoute = {
  method: 'GET',
  path: '/products/{productIdOrSlug}',
  options: {
    tags: ['api', 'products'],
    auth: {
      mode: 'try',
    },
    response: {
      schema: getProductResponseSchema,
    },
    validate: {
      params: getProductParamsSchema,
    },
  },
  async handler(request): Promise<SklepTypes['getProductsProductIdOrSlug200Response']> {
    const user = request.auth.credentials?.session?.user;
    const isAdmin = user?.role === Enums.UserRole.ADMIN;
    const params = request.params as SklepTypes['getProductsProductIdOrSlugRequestPathParams'];

    const maybeId = Number(params.productIdOrSlug);
    const query = Number.isNaN(maybeId)
      ? { slug: params.productIdOrSlug as string }
      : { id: params.productIdOrSlug  };

    const product = await request.server.app.db.product.findFirst({
      where: {
        ...query,
        ...(!isAdmin && {
          isPublic: true,
        }),
      },
      select: productSelect,
      take: 1,
    });

    if (!product) {
      throw Boom.notFound('Product not found.');
    }

    return { data: product };
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
      schema: getProductsResponseSchema,
    },
    validate: {
      query: getProductsQuerySchema,
    },
  },
  async handler(request): Promise<SklepTypes['getProducts200Response']> {
    const { take, skip } = request.query as SklepTypes['getProductsRequestQuery'];

    // if one is defined and the other is not
    if (isNil(take) !== isNil(skip)) {
      throw Boom.badRequest();
    }

    const user = request.auth.credentials?.session?.user;
    const isAdmin = user?.role === Enums.UserRole.ADMIN;

    const query = {
      ...(!isAdmin && {
        where: {
          isPublic: true,
        },
      }),
    };

    const [total, products] = await Promise.all([
      request.server.app.db.product.count({
        ...query,
      }),
      request.server.app.db.product.findMany({
        orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
        ...query,
        ...(take && { take, skip }),
        select: productSelect,
      }),
    ]);

    return { data: products, meta: { total } };
  },
};
