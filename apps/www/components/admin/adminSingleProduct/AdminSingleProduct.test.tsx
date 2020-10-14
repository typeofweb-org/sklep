import type { SklepTypes } from '@sklep/types';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ToastsContextProvider } from '../toasts/Toasts';

import { AdminSingleProduct } from './AdminSingleProduct';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({ query: { productId: '1' }, replace() {} }));

const TEST_USER_DB: Record<number, SklepTypes['getProductsProductIdOrSlug200Response']> = {
  1: {
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
};

function renderAdminSingleProduct() {
  return render(
    <ToastsContextProvider>
      <AdminSingleProduct />
    </ToastsContextProvider>,
  );
}

const server = setupServer(
  rest.get(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const productData = TEST_USER_DB[productId] || {};
    return res(ctx.status(200), ctx.json(productData), ctx.delay(300));
  }),
  rest.delete(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const productData = TEST_USER_DB[productId] || {};
    return res(ctx.status(200), ctx.json(productData), ctx.delay(300));
  }),
);

describe('single product page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads product data', async () => {
    const { findByLabelText } = renderAdminSingleProduct();
    const name = await findByLabelText('Nazwa produktu');
    const description = await findByLabelText('Opis produktu');
    const regularPrice = await findByLabelText('Cena produktu');
    const discountPrice = await findByLabelText('Promocyjna cena produktu');
    const isPublic = await findByLabelText('Czy produkt ma być widoczny na stronie?', {
      exact: false,
    });

    expect(name).toHaveDisplayValue('Computer');
    expect(description).toHaveDisplayValue('Computer for games');
    expect(isPublic).toBeChecked();
    expect(regularPrice).toHaveDisplayValue('1999');
    expect(discountPrice).toHaveDisplayValue('1599');
  });

  it('deletes product', async () => {
    const { findByText, findByRole } = renderAdminSingleProduct();
    const deleteButton = await findByText('Usuń produkt');

    userEvent.click(deleteButton);

    const confirmDeletetionButton = await findByText('Usuń');

    expect(confirmDeletetionButton).toBeInTheDocument();

    userEvent.click(confirmDeletetionButton);

    const notification = await findByRole('alert');

    expect(notification).toHaveTextContent('Produkt został usunięty pomyślnie');
  });

  it('shows error message after it fails to load a product', async () => {
    server.use(
      rest.get(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.delay(300), ctx.json({ message: 'Bad data' }));
      }),
    );
    const { findByText } = renderAdminSingleProduct();
    const errorMessage = await findByText('Wystąpił błąd podczas pobierania danych produktu');
    expect(errorMessage).toBeInTheDocument();
  });
});
