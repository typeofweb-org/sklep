import type { Server } from '@hapi/hapi';
import Cookie from 'cookie';
import Faker from 'faker';
import { last, prop, sortBy } from 'ramda';

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

  it(`gets all carts for ADMIN`, async () => {
    const server = await getServerForTest();

    await server.app.db.cartToProduct.deleteMany({});
    await server.app.db.cart.deleteMany({});
    await server.app.db.product.deleteMany({});
    const products = await mockProducts(server);

    await execute(server, [
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

    await execute(server, [
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
          productId: products[2].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 3,
          productId: products[2].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 20,
          productId: products[0].id,
        },
      },

      {
        method: 'PATCH',
        url: '/cart/add',
        payload: {
          quantity: 1,
          productId: products[2].id,
        },
      },
    ]);

    const auth = await createAndAuthRole(server, Enums.UserRole.ADMIN);
    const injection = await server.inject({
      method: 'GET',
      url: '/cart/all',
      headers: auth.headers,
    });

    const result = injection.result as SklepTypes['getCartAll200Response'];

    expect(result.data).toHaveLength(2);
    const sortedData = sortBy(prop('id'), result.data);

    expect(sortedData[1]).toMatchObject({
      id: expect.any(String),
      discountSubTotal:
        1 * products[1].discountPrice! +
        20 * products[0].discountPrice! +
        6 * products[2].discountPrice!,
      regularSubTotal:
        1 * products[1].regularPrice! +
        20 * products[0].regularPrice! +
        6 * products[2].regularPrice!,
      totalQuantity: 27,
    });
    expect(sortedData[1].cartProducts).toIncludeAllMembers([
      {
        product: {
          discountPrice: products[1].discountPrice,
          id: products[1].id,
          name: products[1].name,
          regularPrice: products[1].regularPrice,
          slug: products[1].slug,
        },
        quantity: 1,
      },
      {
        product: {
          discountPrice: products[0].discountPrice,
          id: products[0].id,
          name: products[0].name,
          regularPrice: products[0].regularPrice,
          slug: products[0].slug,
        },
        quantity: 20,
      },
      {
        product: {
          discountPrice: products[2].discountPrice,
          id: products[2].id,
          name: products[2].name,
          regularPrice: products[2].regularPrice,
          slug: products[2].slug,
        },
        quantity: 6,
      },
    ]);

    expect(sortedData[0]).toMatchObject({
      id: expect.any(String),
      discountSubTotal: 3 * products[1].discountPrice! + 2 * products[0].discountPrice!,
      regularSubTotal: 3 * products[1].regularPrice! + 2 * products[0].regularPrice!,
      totalQuantity: 5,
    });
    expect(sortedData[0].cartProducts).toIncludeAllMembers([
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
    ]);
  });

  it(`doesn't return anything for users who are not admins`, async () => {
    const server = await getServerForTest();
    const auth = await createAndAuthRole(server, Enums.UserRole.USER);
    const injection = await server.inject({
      method: 'GET',
      url: '/cart/all',
      headers: auth.headers,
    });

    expect(injection.statusCode).toEqual(403);
  });
});
