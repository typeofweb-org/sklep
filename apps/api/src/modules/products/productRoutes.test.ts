import { SklepTypes } from '@sklep/types';
import Faker from 'faker';

import { createAndAuthRole, getServerForTest, repeatRequest } from '../../../jest-utils';
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
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: Faker.commerce.price(50, 100),
          discountPrice: Faker.commerce.price(10, 49),
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
          isPublic: Faker.random.arrayElement([true, false]),
          discountPrice: Faker.commerce.price(10, 49),
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
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: Faker.commerce.price(50, 100),
          discountPrice: Faker.commerce.price(10, 49),
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(403);
    });
  });

  describe('GET', () => {
    it(`should get a list of public products`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      await repeatRequest(10, () =>
        server.inject({
          method: 'POST',
          url: '/products',
          headers: auth.headers,
          payload: {
            name: Faker.commerce.productName(),
            description: Faker.lorem.sentences(5),
            isPublic: Faker.random.arrayElement([true, false]),
            regularPrice: Faker.commerce.price(50, 100),
            discountPrice: Faker.commerce.price(10, 49),
            type: Enums.ProductType.SINGLE,
          },
        }),
      );

      const injection = await server.inject({
        method: 'GET',
        url: '/products',
      });

      const result = injection.result as SklepTypes['getProducts200Response'];

      expect(injection.statusCode).toEqual(200);
      expect(result).toHaveProperty('data');
      expect(result.data.every((el) => el.isPublic === true)).toBe(true);
    });
  });
});
