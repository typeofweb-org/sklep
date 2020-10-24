import type { Server } from '@hapi/hapi';
import type { SklepTypes } from '@sklep/types';
import Cookie from 'cookie';
import Faker from 'faker';

import { createAndAuthRole, getServerForTest, repeatRequest } from '../../../jest-utils';
import { Enums } from '../../models';

describe('/orders', () => {
  async function mockOrders(server: Server) {
    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);

    const injections = await repeatRequest(10, () =>
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
    const getProductsInjection = await server.inject({
      method: 'GET',
      url: '/products',
    });
    const products = getProductsInjection.result as SklepTypes['getProducts200Response'];
    await Promise.all(
      Array.from({ length: 10 }).map(async (_, i) => {
        const createCartInjection = await server.inject({
          method: 'POST',
          url: '/cart',
        });
        const cookies = createCartInjection.headers['set-cookie'];
        const parsedCookies = Cookie.parse(String(cookies ?? ''));

        await server.inject({
          method: 'PATCH',
          url: '/cart/add',
          payload: {
            quantity: 1,
            productId: products.data[i].id,
          },
          headers: {
            Cookie: `cart=${parsedCookies.cart}`,
          },
        });
      }),
    );

    const cartsInjection = await server.inject({
      headers: auth.headers,
      method: 'GET',
      url: '/cart/all',
    });
    const carts = cartsInjection.result as SklepTypes['getCartAll200Response'];

    await Promise.all(
      Array.from({ length: 10 }).map(async (_, i) => {
        await server.app.db.order.create({
          data: {
            stripePaymentIntentId: Faker.random.uuid(),
            cart: carts.data[i],
            total: parseInt(Faker.commerce.price(50, 100), 10),
            status: Faker.random.arrayElement([
              'PENDING',
              'PROCESSING',
              'ON_HOLD',
              'COMPLETED',
              'CANCELLED',
              'REFUNDED',
              'FAILED',
            ]),
          },
        });
      }),
    );

    const getOrdersInjecton = await server.inject({
      headers: auth.headers,
      method: 'GET',
      url: '/orders',
    });
    const orders = getOrdersInjecton.result as SklepTypes['getOrders200Response'];
    return orders.data;
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

    expect(orders).toMatchObject(result);
  });
});
