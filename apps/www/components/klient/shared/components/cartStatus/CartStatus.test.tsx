import type { SklepTypes } from '@sklep/types';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';

import { mswMockServer } from '../../../../../jest-utils';
import { Hero } from '../../../modules/hero/Hero';
import { ProductCollection } from '../../../modules/productCollection/ProductCollection';
import { Layout } from '../../../shared/components/layout/Layout';

const fakeProducts: SklepTypes['getProducts200Response']['data'] = [
  {
    id: 1,
    slug: 'Przykładowy',
    name: 'Przykładowy',
    description: 'Testowy produkt',
    isPublic: true,
    regularPrice: 123,
    discountPrice: 111,
    type: 'SINGLE',
  },
];

const fakePostResponse: SklepTypes['postCart200Response'] = {
  data: {
    id: 'ckffunbdz0164slyojqwtc1qv',
    createdAt: '2020-09-23T20:38:05.927Z',
    updatedAt: '2020-09-23T20:38:05.926Z',
    cartProducts: [
      {
        quantity: 1,
        product: {
          id: 1,
          slug: 'Przykładowy',
          name: 'Przykładowy',
          regularPrice: 123,
          discountPrice: 111,
        },
      },
    ],
    regularSubTotal: 123,
    discountSubTotal: 111,
    totalQuantity: 1,
  },
};

const fakeTwoItemsResponse: SklepTypes['postCart200Response'] = {
  data: {
    id: 'ckffunbdz0164slyojqwtc1qv',
    createdAt: '2020-09-23T20:38:05.927Z',
    updatedAt: '2020-09-23T20:38:05.926Z',
    cartProducts: [
      {
        quantity: 2,
        product: {
          id: 1,
          slug: 'Przykładowy',
          name: 'Przykładowy',
          regularPrice: 123,
          discountPrice: 111,
        },
      },
    ],
    regularSubTotal: 123,
    discountSubTotal: 111,
    totalQuantity: 2,
  },
};
describe('adding products to cart', () => {
  beforeEach(() => {
    mswMockServer.use(
      rest.post(process.env.NEXT_PUBLIC_API_URL + '/cart', (_req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(fakePostResponse), ctx.delay(300));
      }),
    );
    mswMockServer.use(
      rest.patch(process.env.NEXT_PUBLIC_API_URL + '/cart/add', (_req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(fakePostResponse), ctx.delay(300));
      }),
    );
  });

  const renderHomeWithProduct = () =>
    render(
      <Layout title="Sklep strona główna">
        <Hero />
        <ProductCollection products={fakeProducts} />
      </Layout>,
    );

  it('should CartStatus badge be visible after clicking Do koszyka', async () => {
    const { getByTestId, getByLabelText } = renderHomeWithProduct();
    userEvent.click(getByLabelText('Dodaj do koszyka'));
    const cartBadge = await waitFor(() => getByTestId('cartCounter'));
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveTextContent('1');
  });

  it('should be 2 items in CartStatus badge', async () => {
    mswMockServer.use(
      rest.post(process.env.NEXT_PUBLIC_API_URL + '/cart', (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(fakeTwoItemsResponse), ctx.delay(300));
      }),
    );
    const { getByTestId, getByLabelText } = renderHomeWithProduct();
    userEvent.click(getByLabelText('Dodaj do koszyka'));
    const cartBadge = await waitFor(() => getByTestId('cartCounter'));
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveTextContent('2');
  });
});
