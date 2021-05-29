import type { Server } from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import Faker from 'faker';

import { createAndAuthRole, getServerForTest, repeatRequest } from '../../../jest-utils';
import { Enums } from '../../models';

describe('/orders', () => {
  async function mockOrders(server: Server) {
    await repeatRequest(10, () =>
      server.app.db.order.create({
        data: {
          status: Faker.random.arrayElement(Object.values(Enums.OrderStatus)),
          total: parseInt(Faker.commerce.price(100, 200), 10),
          cart: {
            id: Faker.datatype.uuid(),
            regularSubTotal: parseInt(Faker.commerce.price(100, 200), 10),
            discountSubTotal: parseInt(Faker.commerce.price(100, 200), 10),
            totalQuantity: Faker.datatype.number({ max: 10 }),
            createdAt: Faker.date.past().toISOString(),
            updatedAt: Faker.date.past().toISOString(),
            cartProducts: [],
          },
          address: {
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            streetName: Faker.address.streetName(),
            houseNumber: Faker.address.streetAddress(),
            apartmentNumber: Faker.address.secondaryAddress(),
            city: Faker.address.city(),
            zipCode: Faker.address.zipCode(),
            phone: Faker.phone.phoneNumber(),
            email: Faker.internet.email(),
          },
        },
      }),
    );

    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);
    const ordersInjection = await server.inject({
      headers: auth.headers,
      url: '/orders',
      method: 'GET',
    });
    const ordersResult = ordersInjection.result as SklepTypes['getOrders200Response'];
    return ordersResult.data;
  }

  it('should get a single order', async () => {
    const server = await getServerForTest();
    const orders = await mockOrders(server);
    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);
    const injection = await server.inject({
      method: 'GET',
      url: `/orders/${orders[0].id}`,
      headers: auth.headers,
    });
    const result = injection.result as SklepTypes['getOrdersOrderId200Response'];

    expect(result.data).toMatchObject({
      id: orders[0].id,
      cart: orders[0].cart,
      total: orders[0].total,
      status: orders[0].status,
      address: orders[0].address,
    });
  });

  it('should get orders', async () => {
    const server = await getServerForTest();
    const orders = await mockOrders(server);
    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);
    const injection = await server.inject({
      method: 'GET',
      url: '/orders',
      headers: auth.headers,
    });
    const result = injection.result as SklepTypes['getOrders200Response'];
    expect(result.data).toMatchObject(orders);
  });

  it('should get specific number of orders', async () => {
    const TAKE = 5;
    const SKIP = 0;

    const server = await getServerForTest();
    const orders = await mockOrders(server);
    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

    const injection = await server.inject({
      method: 'GET',
      url: `/orders?take=${TAKE}&skip=${SKIP}`,
      headers: auth.headers,
    });
    const result = injection.result as SklepTypes['getOrders200Response'];
    expect(result.data).toMatchObject(orders.slice(0, TAKE));
  });

  it('should skip specific number of orders and get the following', async () => {
    const TAKE = 5;
    const SKIP = 5;

    const server = await getServerForTest();
    const orders = await mockOrders(server);
    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

    const injection = await server.inject({
      method: 'GET',
      url: `/orders?take=${TAKE}&skip=${SKIP}`,
      headers: auth.headers,
    });
    const result = injection.result as SklepTypes['getOrders200Response'];
    expect(result.data).toMatchObject(orders.slice(SKIP, SKIP + TAKE));
  });

  describe('PUT', () => {
    it('should update a order', async () => {
      const server = await getServerForTest();
      const orders = await mockOrders(server);
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const newData = {
        status: Enums.OrderStatus.CANCELLED,
      };

      const injection = await server.inject({
        method: 'PUT',
        url: `/orders/${orders[0].id}`,
        headers: auth.headers,
        payload: newData,
      });

      expect(injection.statusCode).toEqual(200);
      const orderInDb = await server.app.db.order.findFirst({ where: { id: orders[0].id } });
      expect(orderInDb).toMatchObject(newData);
    });

    it('should not update a order with invalid data', async () => {
      const server = await getServerForTest();
      const orders = await mockOrders(server);
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'PUT',
        url: `/orders/${orders[0].id}`,
        headers: auth.headers,
        payload: {
          status: 'dupa',
        },
      });

      expect(injection.statusCode).toEqual(400);
    });

    it('should not update a order with invalid order id', async () => {
      const server = await getServerForTest();
      const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

      const injection = await server.inject({
        method: 'PUT',
        url: `/orders/12312312kszkerkumyszke`,
        headers: auth.headers,
        payload: {
          status: Enums.OrderStatus.PROCESSING,
        },
      });

      expect(injection.statusCode).toEqual(404);
    });
  });
});
