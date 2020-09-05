import Hapi from '@hapi/hapi';
import { SklepTypes } from '@sklep/types';
import Slugify from 'slugify';

import { Enums } from '../../models';

import { addProductPayloadSchema, getProductResponseSchema } from './productSchemas';

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
    });

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
      schema: getProductResponseSchema,
    },
  },
  async handler(request) {
    const user = request.auth.credentials?.session?.user;
    const isAdmin = user?.role === Enums.UserRole.ADMIN;

    const products = await request.server.app.db.product.findMany({
      ...(!isAdmin && {
        where: {
          isPublic: true,
        },
      }),
      select: {
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
      },
    });

    return { data: products };
  },
};
