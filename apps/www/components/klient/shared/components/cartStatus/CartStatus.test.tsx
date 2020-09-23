import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { Hero } from '../../../modules/hero/Hero';
import { ProductCollection } from '../../../modules/productCollection/ProductCollection';
import { Layout } from '../../../shared/components/layout/Layout';

const types = 'SINGLE' as const;

const fakeProduct = [
  {
    id: 1,
    slug: 'Przykładowy',
    name: 'Przykładowy',
    description: 'Testowy produkt',
    isPublic: true,
    regularPrice: 123,
    discountPrice: 111,
    type: types,
  },
];

const fakePostResponse = {
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
const server = setupServer(
  rest.post(process.env.NEXT_PUBLIC_API_URL + '/cart', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakePostResponse), ctx.delay(300));
  }),
);

describe('adding products to card', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should CartStatus badge be visible after clicking dodaj do koszyka', async () => {
    const renderHomeWithProduct = () =>
      render(
        <Layout title="Sklep strona główna">
          <Hero />
          <ProductCollection products={fakeProduct} />
        </Layout>,
      );

    const { getByTestId, getByLabelText } = renderHomeWithProduct();
    userEvent.click(getByLabelText('Do koszyka'));
    const cartBadge = await waitFor(() => getByTestId('cartCounter'));
    expect(cartBadge).toBeInTheDocument();
  });
});
