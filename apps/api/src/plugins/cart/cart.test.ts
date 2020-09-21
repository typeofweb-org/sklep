import type { Server } from '@hapi/hapi';
import Cookie from 'cookie';
import Faker from 'faker';
import { last } from 'ramda';

import type { SklepTypes } from '../../../../types/index';
import { createAndAuthRole, execute, getServerForTest, repeatRequest } from '../../../jest-utils';
import { Enums } from '../../models';

describe('/cart', () => {
  async function mockProducts(server: Server) {
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
    const getProductsInjection = await server.inject({
      method: 'GET',
      url: '/products',
    });
    const products = getProductsInjection.result as SklepTypes['getProducts200Response'];
    return products.data;
  }

  it(`should create an empty cart and return it`, async () => {
    const server = await getServerForTest();

    const injection = await server.inject({
      method: 'POST',
      url: '/cart',
    });

    const result = injection.result as SklepTypes['postCart200Response'];
    expect(result.data).toMatchObject({
      id: expect.any(String),
      cartProducts: [],
      regularSubTotal: 0,
      discountSubTotal: 0,
      totalQuantity: 0,
    });

    const cookies = injection.headers['set-cookie'];
    const parsedCookies = Cookie.parse(String(cookies ?? ''));
    expect(parsedCookies).toHaveProperty('cart', expect.any(String));
  });

  it(`adds products to the cart`, async () => {
    const server = await getServerForTest();
    const products = await mockProducts(server);

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
        productId: products[0].id,
      },
      headers: {
        Cookie: `cart=${parsedCookies.cart}`,
      },
    });

    const newCartInjection = await server.inject({
      method: 'POST',
      url: '/cart',
      headers: {
        Cookie: `cart=${parsedCookies.cart}`,
      },
    });
    const result = newCartInjection.result as SklepTypes['postCart200Response'];
    expect(result.data).toMatchObject({
      id: expect.any(String),
      regularSubTotal: products[0].regularPrice,
      discountSubTotal: products[0].discountPrice,
      totalQuantity: 1,
      cartProducts: [
        {
          product: {
            discountPrice: products[0].discountPrice,
            id: products[0].id,
            name: products[0].name,
            regularPrice: products[0].regularPrice,
            slug: products[0].slug,
          },
          quantity: 1,
        },
      ],
    });
  });

  it(`adds products to the cart complex`, async () => {
    const server = await getServerForTest();
    const products = await mockProducts(server);

    const results = await execute(server, [
      {
        method: 'POST',
        url: '/cart',
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 1,
          productId: products[0].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 2,
          productId: products[0].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 5,
          productId: products[1].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/clear',
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 1,
          productId: products[1].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 2,
          productId: products[1].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 2,
          productId: products[2].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 2,
          productId: products[0].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/remove',
        payload: {
          productId: products[2].id,
        },
      },
      {
        method: 'POST',
        url: '/cart',
      },
    ]);

    const newCartInjection = last(results)!;
    const result = newCartInjection.result as SklepTypes['postCart200Response'];
    expect(result.data).toMatchObject({
      id: expect.any(String),
      regularSubTotal: 2 * products[0].regularPrice + 3 * products[1].regularPrice,
      discountSubTotal:
        2 * (products[0].discountPrice ?? products[0].regularPrice) +
        3 * (products[1].discountPrice ?? products[1].regularPrice),
      totalQuantity: 5,
      cartProducts: [
        {
          product: {
            discountPrice: products[1].discountPrice,
            id: products[1].id,
            name: products[1].name,
            regularPrice: products[1].regularPrice,
            slug: products[1].slug,
          },
          quantity: 3,
        },
        {
          product: {
            discountPrice: products[0].discountPrice,
            id: products[0].id,
            name: products[0].name,
            regularPrice: products[0].regularPrice,
            slug: products[0].slug,
          },
          quantity: 2,
        },
      ],
    });
  });
});
