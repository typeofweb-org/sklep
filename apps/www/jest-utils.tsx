import { render } from '@testing-library/react';
import Nock from 'nock';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastsContextProvider as AdminToastsContextProvider } from './components/admin/toasts/Toasts';
import { ToastContextProvider as KlientToastContextProvider } from './components/klient/shared/components/toast/Toast';

export const initMockServer = () => {
  const mockServer = Nock(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost', {
    allowUnmocked: false,
  });

  beforeEach(() => {
    Nock.disableNetConnect();
  });

  afterEach(() => {
    if (!mockServer.isDone()) {
      console.error(mockServer.pendingMocks());
    }
    mockServer.done();

    Nock.cleanAll();
    Nock.enableNetConnect();
  });

  return mockServer;
};

interface Options {
  readonly queryClientConfig?: ConstructorParameters<typeof QueryClient>[0];
}

export const TestProvider = ({
  children,
  options,
}: PropsWithChildren<{ readonly options?: Options }>) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retryDelay: 10,
              ...options?.queryClientConfig?.defaultOptions?.queries,
            },
            ...options?.queryClientConfig?.defaultOptions,
          },
          ...options?.queryClientConfig,
        })
      }
    >
      <AdminToastsContextProvider>
        <KlientToastContextProvider>{children}</KlientToastContextProvider>
      </AdminToastsContextProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (Component: ReactElement) => {
  render(Component, { wrapper: TestProvider });
};
