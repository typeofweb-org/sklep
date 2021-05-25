import ms from 'ms';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from 'react-query-devtools';
import type { DehydratedState } from 'react-query/hydration';
import { Hydrate } from 'react-query/hydration';

import { ToastContextProvider } from '../components/klient/shared/components/toast/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          staleTime: ms('10 seconds'),
        },
      },
    });
  }

  const { dehydratedState } = pageProps as { readonly dehydratedState?: DehydratedState };
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ToastContextProvider>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
