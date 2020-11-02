import type { SklepTypes } from '@sklep/types';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';

import { mswMockServer } from '../../../jest-utils';
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

describe('single product page', () => {
  beforeEach(() =>
    mswMockServer.use(
      rest.get(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (req, res, ctx) => {
        const productId = Number(req.params.productId);
        const productData = TEST_USER_DB[productId] || {};
        return res(ctx.status(200), ctx.json(productData), ctx.delay(300));
      }),
    ),
  );

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
    expect(regularPrice).toHaveDisplayValue('19.99');
    expect(discountPrice).toHaveDisplayValue('15.99');
  });

  it('deletes product', async () => {
    mswMockServer.use(
      rest.delete(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (req, res, ctx) => {
        const productId = Number(req.params.productId);
        const productData = TEST_USER_DB[productId] || {};
        return res(ctx.status(200), ctx.json(productData), ctx.delay(300));
      }),
    );

    const { findByText, findByRole } = renderAdminSingleProduct();
    const deleteButton = await findByText('Usuń produkt');

    userEvent.click(deleteButton);

    const confirmDeleteButton = await findByText('Usuń');
    expect(confirmDeleteButton).toBeInTheDocument();

    userEvent.click(confirmDeleteButton);

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent('Produkt został usunięty pomyślnie');
  });

  it('shows error message after it fails to load a product', async () => {
    mswMockServer.use(
      rest.get(process.env.NEXT_PUBLIC_API_URL + '/products/:productId', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.delay(300), ctx.json({ message: 'Bad data' }));
      }),
    );
    const { findByText } = renderAdminSingleProduct();
    const errorMessage = await findByText(
      'Wystąpił błąd podczas pobierania danych produktu',
      {},
      { timeout: 10000 }, // React query will try to refetch several times
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
