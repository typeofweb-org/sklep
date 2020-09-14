import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ProductsForm } from './ProductsForm';

const server = setupServer(
  rest.post(process.env.NEXT_PUBLIC_API_URL + '/products', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}), ctx.delay(300));
  }),
);

describe('form for adding products', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows error after confirming without required data', () => {
    const { getByText } = render(<ProductsForm />);

    userEvent.click(getByText('Dodaj produkt'));

    expect(getByText('Nazwa produktu jest wymaganym polem')).toBeInTheDocument();
    expect(getByText('Cena produktu jest wymaganym polem')).toBeInTheDocument();
    expect(getByText('Opis produktu jest wymaganym polem')).toBeInTheDocument();
  });

  it('allows user to add product', async () => {
    const { getByLabelText, getByText, findByRole } = render(<ProductsForm />);

    userEvent.type(getByLabelText('Nazwa produktu'), 'Buty XYZ');
    userEvent.type(getByLabelText('Cena produktu'), '99.9');
    userEvent.type(getByLabelText('Opis produktu'), 'Dobra rzecz');

    userEvent.click(getByText('Dodaj produkt'));

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent('Dodałeś produkt do bazy danych');
  });

  it('shows error notification after bad request server exception', async () => {
    server.use(
      rest.post(process.env.NEXT_PUBLIC_API_URL + '/products', (_req, res, ctx) => {
        return res(ctx.status(400), ctx.delay(300), ctx.json({}));
      }),
    );

    const { getByLabelText, getByText, findByRole } = render(<ProductsForm />);

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
