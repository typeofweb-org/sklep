import Faker from 'faker';

import { createAndAuthRole, getServerForTest } from '../../../jest-utils';
import { Enums } from '../../models';

describe('/products', () => {
  describe('POST', () => {
    it(`should create a product`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.commerce.productName(),
          description: Faker.lorem.sentences(5),
          isPublic: true,
          regularPrice: 100,
          discountPrice: 50,
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(200);
    });

    it(`should not create a product if some props are missing`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          description: Faker.lorem.sentences(5),
          isPublic: true,
          discountPrice: 50,
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(400);
    });

    it(`should not create a product if user is not an admin`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.USER);

      const injection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.commerce.productName(),
          description: Faker.lorem.sentences(5),
          isPublic: true,
          regularPrice: 100,
          discountPrice: 50,
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(403);
    });
  });
});
