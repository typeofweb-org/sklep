import type { SklepTypes } from '@sklep/types';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initMockServer, renderWithProviders } from '../../../../../jest-utils';
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

const renderHomeWithProduct = () =>
  renderWithProviders(
    <Layout title="Sklep strona główna">
      <Hero />
      <ProductCollection products={fakeProducts} />
    </Layout>,
  );

describe('adding products to cart', () => {
  const server = initMockServer();

  it('should CartStatus badge be visible after clicking Do koszyka', async () => {
    server.post('/cart').reply(200, fakePostResponse);
    server.patch('/cart/add').reply(200, fakePostResponse);

    const { getByTestId, getByLabelText } = renderHomeWithProduct();
    userEvent.click(getByLabelText('Dodaj do koszyka'));
    const cartBadge = await waitFor(() => getByTestId('cartCounter'));
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveTextContent('1');
  });

  it('should be 2 items in CartStatus badge', async () => {
    server.post('/cart').reply(200, fakeTwoItemsResponse);
    server.patch('/cart/add').reply(200, fakePostResponse);

    const { getByTestId, getByLabelText } = renderHomeWithProduct();
    userEvent.click(getByLabelText('Dodaj do koszyka'));
    const cartBadge = await waitFor(() => getByTestId('cartCounter'));
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveTextContent('2');
  });
});
