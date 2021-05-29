import type { SklepTypes } from '@sklep/types';
import Faker from 'faker';

import { createAndAuthRole, getServerForTest, repeatRequest } from '../../../jest-utils';
import { Enums } from '../../models';

describe('/taxes', () => {
  describe('POST', () => {
    it('should create a tax', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });
      expect(injection.statusCode).toEqual(200);
    });

    it(`should not create a tax if some props are missing`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });

      expect(injection.statusCode).toEqual(400);
    });

    it(`should not create a tax if user is not an admin`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.USER);

      const injection = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });
      expect(injection.statusCode).toEqual(403);
    });
  });

  describe('GET', () => {
    describe('singe tax', () => {
      it('should get a single tax by id', async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

        const postInjection = await server.inject({
          method: 'POST',
          url: '/taxes',
          headers: auth.headers,
          payload: {
            name: Faker.lorem.sentence(5),
            taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
          },
        });

        const { data } = postInjection.result as SklepTypes['postTaxes200Response'];

        const getInjection = await server.inject({
          method: 'GET',
          url: `/taxes/${data.id}`,
          headers: auth.headers,
        });

        const result = getInjection.result as SklepTypes['getTaxesTaxId200Response'];

        expect(getInjection.statusCode).toEqual(200);
        expect(result).toHaveProperty('data');
      });

      it('should fail if user is not admin', async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.USER);

        const getInjection = await server.inject({
          method: 'GET',
          url: `/tax/1`,
          headers: auth.headers,
        });

        expect(getInjection.statusCode).toEqual(404);
      });

      it('should fail to get non-existing tax', async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

        const getInjection = await server.inject({
          method: 'GET',
          url: `/tax/6900000`,
          headers: auth.headers,
        });

        expect(getInjection.statusCode).toEqual(404);
      });
    });

    describe('all taxes', () => {
      it(`should get a list of taxes`, async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

        await repeatRequest(10, () =>
          server.inject({
            method: 'POST',
            url: '/taxes',
            headers: auth.headers,
            payload: {
              name: Faker.lorem.sentence(5),
              taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
            },
          }),
        );

        const injection = await server.inject({
          method: 'GET',
          url: '/taxes',
          headers: auth.headers,
        });

        const result = injection.result as SklepTypes['getTaxes200Response'];

        expect(injection.statusCode).toEqual(200);
        expect(result).toHaveProperty('data');
        //TODO: Change to toEqual once db is mocked
        expect(result.data.length).toBeGreaterThanOrEqual(10);
      });

      it('should fail if user is not admin', async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.USER);

        const getInjection = await server.inject({
          method: 'GET',
          url: `/tax`,
          headers: auth.headers,
        });

        expect(getInjection.statusCode).toEqual(404);
      });

      it(`should get empty list`, async () => {
        const server = await getServerForTest();
        const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

        const injection = await server.inject({
          method: 'GET',
          url: '/taxes',
          headers: auth.headers,
        });

        const result = injection.result as SklepTypes['getTaxes200Response'];

        expect(injection.statusCode).toEqual(200);
        expect(result).toHaveProperty('data');
        //TODO: Change to toEqual empty list once db is mocked
      });
    });
  });

  describe('PUT', () => {
    it(`should update a product with new data`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection1 = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });
      const { data } = injection1.result as SklepTypes['postTaxes200Response'];

      const newData = {
        name: Faker.lorem.sentence(5),
        taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
      };

      const injection = await server.inject({
        method: 'PUT',
        url: `/taxes/${data.id}`,
        headers: auth.headers,
        payload: newData,
      });

      expect(injection.statusCode).toEqual(200);

      const taxInDb = await server.app.db.tax.findFirst({ where: { id: data.id } });
      expect(taxInDb).toMatchObject(newData);
    });

    it(`should not update a tax with invalid data`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection1 = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });
      const { data } = injection1.result as SklepTypes['postProducts200Response'];

      const injection = await server.inject({
        method: 'PUT',
        url: `/taxes/${data.id}`,
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: 'notANumber',
        },
      });

      expect(injection.statusCode).toEqual(400);
    });

    it(`should not update a non-existing tax`, async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'PUT',
        url: `/taxes/123123123123`,
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });

      expect(injection.statusCode).toEqual(404);
    });
  });

  describe('DELETE', () => {
    it('should delete a tax', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'POST',
        url: '/taxes',
        headers: auth.headers,
        payload: {
          name: Faker.lorem.sentence(5),
          taxRate: Faker.datatype.number({ min: 1, max: 99, precision: 1 }),
        },
      });
      const { data } = injection.result as SklepTypes['postProducts200Response'];

      const deleteInjection = await server.inject({
        method: 'DELETE',
        url: `/taxes/${data.id}`,
        headers: auth.headers,
      });

      expect(deleteInjection.statusCode).toEqual(204);
    });

    it('should delete a non-existent tax', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const deleteInjection = await server.inject({
        method: 'DELETE',
        url: `/taxes/12312312333`,
        headers: auth.headers,
      });
      expect(deleteInjection.statusCode).toEqual(204);
    });
  });
});
