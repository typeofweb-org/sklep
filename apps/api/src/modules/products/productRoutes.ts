import Hapi from '@hapi/hapi';
import { SklepTypes } from '@sklep/types';
import Slugify from 'slugify';

import { Enums } from '../../models';

import { addProductPayloadSchema } from './productSchemas';

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
    const user = request.auth.credentials.session.user;

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
