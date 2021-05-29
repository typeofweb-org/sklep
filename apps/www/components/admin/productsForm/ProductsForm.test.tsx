import { screen } from '@testing-library/react';
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
    renderProductsForm({ mode: 'ADDING', mutation: createProduct });

    userEvent.click(screen.getByText('Dodaj produkt'));

    expect(screen.getByText('Nazwa produktu jest polem wymaganym')).toBeInTheDocument();
    expect(screen.getByText('Cena produktu jest polem wymaganym')).toBeInTheDocument();
    expect(screen.getByText('Opis produktu jest polem wymaganym')).toBeInTheDocument();
  });

  it('allows user to add product', async () => {
    server.post('/products').reply(200, { data: {} });

    renderProductsForm({
      mode: 'ADDING',
      mutation: createProduct,
    });

    userEvent.type(screen.getByLabelText('Nazwa produktu'), 'Buty XYZ');
    userEvent.type(screen.getByLabelText('Cena produktu'), '99.9');
    userEvent.type(screen.getByLabelText('Opis produktu'), 'Dobra rzecz');

    userEvent.click(screen.getByText('Dodaj produkt'));

    const notification = await screen.findByRole('alert');
    expect(notification).toHaveTextContent('Dodałeś produkt do bazy danych');
  });

  it('shows error notification after bad request', async () => {
    server.post('/products').reply(400, { details: [] });

    renderProductsForm({
      mode: 'ADDING',
      mutation: createProduct,
    });

    userEvent.type(screen.getByLabelText('Nazwa produktu'), 'Buty XYZ');
    userEvent.type(screen.getByLabelText('Cena produktu'), '99.9');
    userEvent.type(screen.getByLabelText('Opis produktu'), 'Dobra rzecz');

    userEvent.click(screen.getByText('Dodaj produkt'));

    const notification = await screen.findByRole('alert');
    expect(notification).toHaveTextContent(
      'Wystąpił błąd podczas dodawania produktu do bazy danych',
    );
  });
});
