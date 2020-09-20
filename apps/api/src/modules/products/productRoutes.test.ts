import type { SklepTypes } from '@sklep/types';
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
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
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
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
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
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(403);
    });
  });

  describe('PUT', () => {
    it(`should update a product with new data`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection1 = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });
      const { data } = injection1.result as SklepTypes['postProducts200Response'];

      const newData = {
        name: Faker.lorem.sentence(5),
        description: Faker.lorem.sentences(5),
        isPublic: Faker.random.arrayElement([true, false]),
        regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
        discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
        type: Enums.ProductType.SINGLE,
      };

      const injection = await server.inject({
        method: 'PUT',
        url: `/products/${data.id}`,
        headers: auth.headers,
        payload: newData,
      });

      expect(injection.statusCode).toEqual(200);

      const productInDb = await server.app.db.product.findOne({ where: { id: data.id } });
      expect(productInDb).toMatchObject(newData);
    });
    it(`should not update a product with invalid data`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection1 = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });
      const { data } = injection1.result as SklepTypes['postProducts200Response'];

      const injection = await server.inject({
        method: 'PUT',
        url: `/products/${data.id}`,
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: 'DUPA',
        },
      });

      expect(injection.statusCode).toEqual(400);
    });

    it(`should not update a non-existent product`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'PUT',
        url: `/products/123123123123`,
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });

      expect(injection.statusCode).toEqual(404);
    });
  });

  describe('DELETE', () => {
    it('should delete a product', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection1 = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: Faker.random.arrayElement([true, false]),
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });
      const { data } = injection1.result as SklepTypes['postProducts200Response'];

      await server.inject({
        method: 'DELETE',
        url: `/products/${data.id}`,
        headers: auth.headers,
      });
    });

    it('should delete a non-existent product', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      await server.inject({
        method: 'DELETE',
        url: `/products/12312312333`,
        headers: auth.headers,
      });
    });
  });

  describe('GET', () => {
    it('should get a single public product by id', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const postInjection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: true,
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });

      const { data } = postInjection.result as SklepTypes['postProducts200Response'];

      const getInjection = await server.inject({
        method: 'GET',
        url: `/products/${data.id}`,
        headers: auth.headers,
      });

      const result = getInjection.result as SklepTypes['getProductsProductId200Response'];

      expect(getInjection.statusCode).toEqual(200);
      expect(result).toHaveProperty('data');
      expect(result.data.isPublic).toBe(true);
    });

    it('should get not public product with admin role', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const postInjection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: false,
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });

      const { data } = postInjection.result as SklepTypes['postProducts200Response'];

      const getInjection = await server.inject({
        method: 'GET',
        url: `/products/${data.id}`,
        headers: auth.headers,
      });

      const result = getInjection.result as SklepTypes['getProductsProductId200Response'];

      expect(getInjection.statusCode).toEqual(200);
      expect(result).toHaveProperty('data');
      expect(result.data.isPublic).toBe(false);
    });

    it('should fail to get nonexisting product', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.USER);

      const getInjection = await server.inject({
        method: 'GET',
        url: `/products/6900000`,
        headers: auth.headers,
      });

      expect(getInjection.statusCode).toEqual(404);
    });

    it('should fail to get not public product for user role', async () => {
      const server = await getServerForTest();
      const adminAuth = await createAndAuthRole(server, Enums.UserRole.ADMIN);
      const userAuth = await createAndAuthRole(server, Enums.UserRole.USER);

      const postInjection = await server.inject({
        method: 'POST',
        url: '/products',
        headers: adminAuth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          description: Faker.lorem.sentences(5),
          isPublic: false,
          regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
          discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
          type: Enums.ProductType.SINGLE,
        },
      });

      const { data } = postInjection.result as SklepTypes['postProducts200Response'];

      const getInjection = await server.inject({
        method: 'GET',
        url: `/products/${data.id}`,
        headers: userAuth.headers,
      });

      expect(getInjection.statusCode).toEqual(404);
    });

    it(`should get a list of public products`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      await repeatRequest(10, () =>
        server.inject({
          method: 'POST',
          url: '/products',
          headers: auth.headers,
          payload: {
            name: Faker.lorem.sentence(5),
            description: Faker.lorem.sentences(5),
            isPublic: Faker.random.arrayElement([true, false]),
            regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
            discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
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

    it(`should allow to paginate products`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      await repeatRequest(10, () =>
        server.inject({
          method: 'POST',
          url: '/products',
          headers: auth.headers,
          payload: {
            name: Faker.lorem.sentence(5),
            description: Faker.lorem.sentences(5),
            isPublic: Faker.random.arrayElement([true, false]),
            regularPrice: parseInt(Faker.commerce.price(50, 100), 10),
            discountPrice: parseInt(Faker.commerce.price(10, 49), 10),
            type: Enums.ProductType.SINGLE,
          },
        }),
      );

      const allProductsInjection = await server.inject({
        method: 'GET',
        url: '/products',
      });
      const products = allProductsInjection.result as SklepTypes['getProducts200Response'];

      const paginatedInjection = await server.inject({
        method: 'GET',
        url: '/products?take=3&skip=5',
      });

      const result = paginatedInjection.result as SklepTypes['getProducts200Response'];

      expect(paginatedInjection.statusCode).toEqual(200);
      expect(result).toHaveProperty('data');
      expect(result.data.every((el) => el.isPublic === true)).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data).toEqual(products.data.slice(5, 8));
    });
  });
});
