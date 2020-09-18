import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ToastsContextProvider } from '../toasts/Toasts';

import { LoginForm } from './LoginForm';

const renderLoginForm = () =>
  render(
    <ToastsContextProvider>
      <LoginForm />
    </ToastsContextProvider>,
  );

const server = setupServer(
  rest.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({}), ctx.delay(300));
  }),
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows error after confirming without required data', () => {
  const { getByText } = renderLoginForm();

  userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

  expect(getByText('Wpisz poprawny adres email')).toBeInTheDocument();
  expect(getByText('Pole jest wymagane')).toBeInTheDocument();
});

test('unsuccesfull login', async () => {
  const { getByLabelText, getByText, findByRole } = renderLoginForm();

  userEvent.type(getByLabelText('Adres email'), 'testowy@test.pl');
  userEvent.type(getByLabelText('Hasło'), 'niepoprawne');

  await userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

  const notification = await findByRole('alert');
  expect(notification).toHaveTextContent('Wprowadzone dane nie są poprawne');
});

test('succesfull login', async () => {
  server.use(
    rest.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', (_req, res, ctx) => {
      return res(ctx.status(204), ctx.json({}), ctx.delay(300));
    }),
  );

  const { getByLabelText, getByText, findByRole } = renderLoginForm();

  userEvent.type(getByLabelText('Adres email'), 'test@test1.pl');
  userEvent.type(getByLabelText('Hasło'), 'qwertyTESTOWY');

  await userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

  const notification = await findByRole('alert');
  expect(notification).toHaveTextContent('Logowanie udane');
});
