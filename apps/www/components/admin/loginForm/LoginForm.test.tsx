import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';

import { mswMockServer } from '../../../jest-utils';
import { ToastsContextProvider } from '../toasts/Toasts';

import { LoginForm } from './LoginForm';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({ replace() {} }));

describe('login form', () => {
  const renderLoginForm = () =>
    render(
      <ToastsContextProvider>
        <LoginForm />
      </ToastsContextProvider>,
    );

  beforeEach(() => {
    mswMockServer.use(
      rest.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', (_req, res, ctx) => {
        return res(ctx.status(401), ctx.json({}), ctx.delay(300));
      }),
    );
  });

  it('shows error after confirming without required data', () => {
    const { getByText } = renderLoginForm();

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    expect(getByText('Wpisz poprawny adres email')).toBeInTheDocument();
    expect(getByText('Pole jest wymagane')).toBeInTheDocument();
  });

  it('shows error after confirming with improper data', async () => {
    const { getByLabelText, getByText, findByRole } = renderLoginForm();

    await userEvent.type(getByLabelText('Adres e-mail'), 'testowy@test.pl');
    await userEvent.type(getByLabelText('Hasło'), 'niepoprawne');

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent('Wprowadzone dane nie są poprawne');
  });

  it('shows notification after successful login', async () => {
    mswMockServer.use(
      rest.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', (_req, res, ctx) => {
        return res(ctx.status(204), ctx.json({}), ctx.delay(300));
      }),
    );

    const { getByLabelText, getByText, findByRole } = renderLoginForm();

    await userEvent.type(getByLabelText('Adres e-mail'), 'test@test1.pl');
    await userEvent.type(getByLabelText('Hasło'), 'qwertyTESTOWY');

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    const notification = await findByRole('alert');
    expect(notification).toHaveTextContent('Logowanie udane');
  });
});
