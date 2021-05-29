import type { SklepTypes } from '@sklep/types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { initMockServer, renderWithProviders } from '../../../jest-utils';

import { AdminSingleProduct } from './AdminSingleProduct';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const productId = 1;
useRouter.mockImplementation(() => ({ query: { productId }, replace() {} }));

const TEST_PRODUCTS: ReadonlyArray<SklepTypes['getProductsProductIdOrSlug200Response']> = [
  {
    data: {
      id: 1,
      slug: 'computer',
      name: 'Computer',
      description: 'Computer for games',
      isPublic: true,
      regularPrice: 1999,
      discountPrice: 1599,
      type: 'SINGLE',
    },
  },
];

function renderAdminSingleProduct() {
  return renderWithProviders(<AdminSingleProduct />);
}

describe('single product page', () => {
  const server = initMockServer();

  it('loads product data', async () => {
    server.get(`/products/${productId}`).reply(
      200,
      TEST_PRODUCTS.find((el) => el.data.id === productId),
    );

    renderAdminSingleProduct();
    const name = await screen.findByLabelText('Nazwa produktu');
    const description = await screen.findByLabelText('Opis produktu');
    const regularPrice = await screen.findByLabelText('Cena produktu');
    const discountPrice = await screen.findByLabelText('Promocyjna cena produktu');
    const isPublic = await screen.findByLabelText('Czy produkt ma być widoczny na stronie?', {
      exact: false,
    });

    expect(name).toHaveDisplayValue('Computer');
    expect(description).toHaveDisplayValue('Computer for games');
    expect(isPublic).toBeChecked();
    expect(regularPrice).toHaveDisplayValue('19.99');
    expect(discountPrice).toHaveDisplayValue('15.99');
  });

  it('deletes product', async () => {
    server.get(`/products/${productId}`).reply(
      200,
      TEST_PRODUCTS.find((el) => el.data.id === productId),
    );

    server.delete(`/products/${productId}`).reply(
      200,
      TEST_PRODUCTS.find((el) => el.data.id === productId),
    );

    renderAdminSingleProduct();
    const deleteButton = await screen.findByText('Usuń produkt');

    userEvent.click(deleteButton);

    const confirmDeleteButton = await screen.findByText('Usuń');
    expect(confirmDeleteButton).toBeInTheDocument();

    userEvent.click(confirmDeleteButton);

    const notification = await screen.findByRole('alert');
    expect(notification).toHaveTextContent('Produkt został usunięty pomyślnie');
  });

  it('shows error message after it fails to load a product', async () => {
    server.get(`/products/${productId}`).times(4).reply(400, { message: 'Bad data' });

    renderAdminSingleProduct();
    const errorMessage = await screen.findByText(
      'Wystąpił błąd podczas pobierania danych produktu',
      {},
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
