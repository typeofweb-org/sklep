import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { initMockServer, renderWithProviders } from '../../../jest-utils';

import { LoginForm } from './LoginForm';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({ replace() {} }));

describe('login form', () => {
  const renderLoginForm = () => renderWithProviders(<LoginForm />);
  const server = initMockServer();

  it('shows error after confirming without required data', () => {
    const { getByText } = renderLoginForm();

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    expect(getByText('Wpisz poprawny adres email')).toBeInTheDocument();
    expect(getByText('Pole jest wymagane')).toBeInTheDocument();
  });

  it('shows error after confirming with improper data', async () => {
    server.post(`/auth/login`).reply(401);

    const { getByLabelText, getByText, findByRole } = renderLoginForm();

    userEvent.type(getByLabelText('Adres e-mail'), 'testowy@test.pl');
    userEvent.type(getByLabelText('Hasło'), 'niepoprawne');

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    await waitFor(async () => {
      const notification = await findByRole('alert');
      expect(notification).toHaveTextContent('Wprowadzone dane nie są poprawne');
    });
  });

  it('shows notification after successful login', async () => {
    server.post(`/auth/login`).reply(204);

    const { getByLabelText, getByText, findByRole } = renderLoginForm();

    userEvent.type(getByLabelText('Adres e-mail'), 'test@test1.pl');
    userEvent.type(getByLabelText('Hasło'), 'qwertyTESTOWY');

    userEvent.click(getByText('Zaloguj się', { selector: 'button' }));

    await waitFor(async () => {
      const notification = await findByRole('alert');
      expect(notification).toHaveTextContent('Logowanie udane');
    });
  });
});
