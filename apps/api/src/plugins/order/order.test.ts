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
            id: Faker.random.uuid(),
            regularSubTotal: parseInt(Faker.commerce.price(100, 200), 10),
            discountSubTotal: parseInt(Faker.commerce.price(100, 200), 10),
            totalQuantity: Faker.random.number(10),
            createdAt: Faker.date.past().toISOString(),
            updatedAt: Faker.date.past().toISOString(),
            cartProducts: [],
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
    expect(orders).toMatchObject(result.data);
  });
});
