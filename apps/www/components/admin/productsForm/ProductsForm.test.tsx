import userEvent from '@testing-library/user-event';
import React from 'react';

import { initMockServer, renderWithProviders } from '../../../jest-utils';
import { createProduct } from '../../../utils/api/createProduct';
import { ToastsContextProvider } from '../toasts/Toasts';

import type { ProductsFormProps } from './ProductsForm';
import { ProductsForm } from './ProductsForm';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({ replace() {} }));

function renderProductsForm(productsFormProps: ProductsFormProps) {
  return renderWithProviders(
    <ToastsContextProvider>
      <ProductsForm {...productsFormProps} />
    </ToastsContextProvider>,
  );
}

describe('form for adding products', () => {
  const server = initMockServer();

  it('shows error after confirming without required data', () => {
    const { getByText } = renderProductsForm({ mode: 'ADDING', mutation: createProduct });

    userEvent.click(getByText('Dodaj produkt'));

    expect(getByText('Nazwa produktu jest polem wymaganym')).toBeInTheDocument();
    expect(getByText('Cena produktu jest polem wymaganym')).toBeInTheDocument();
    expect(getByText('Opis produktu jest polem wymaganym')).toBeInTheDocument();
  });

  it('allows user to add product', async () => {
    server.post('/products').reply(200, { data: {} });

    const { getByLabelText, getByText, findByRole } = renderProductsForm({
      mode: 'ADDING',
      mutation: createProduct,
    });

    userEvent.type(getByLabelText('Nazwa produktu'), 'Buty XYZ');
    userEvent.type(getByLabelText('Cena produktu'), '99.9');
    userEvent.type(getByLabelText('Opis produktu'), 'Dobra rzecz');

    userEvent.click(getByText('Dodaj produkt'));

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent('Dodałeś produkt do bazy danych');
  });

  it('shows error notification after bad request', async () => {
    server.post('/products').reply(400, { details: [] });

    const { getByLabelText, getByText, findByRole } = renderProductsForm({
      mode: 'ADDING',
      mutation: createProduct,
    });

    userEvent.type(getByLabelText('Nazwa produktu'), 'Buty XYZ');
    userEvent.type(getByLabelText('Cena produktu'), '99.9');
    userEvent.type(getByLabelText('Opis produktu'), 'Dobra rzecz');

    userEvent.click(getByText('Dodaj produkt'));

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent(
      'Wystąpił błąd podczas dodawania produktu do bazy danych',
    );
  });
});
