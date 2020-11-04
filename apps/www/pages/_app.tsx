import ms from 'ms';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import type { ReactQueryConfig } from 'react-query';
import { ReactQueryCacheProvider, QueryCache, ReactQueryConfigProvider } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from 'react-query-devtools';
import type { DehydratedState } from 'react-query/hydration';
import { Hydrate } from 'react-query/hydration';

import { ToastContextProvider } from '../components/klient/shared/components/toast/Toast';

const queryCache = new QueryCache();
const reactQueryConfigOverrides: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    initialStale: true,
    refetchOnMount: true,
    refetchOnReconnect: false,
    staleTime: ms('10 seconds'),
  },
  mutations: {
    throwOnError: true,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const { dehydratedState } = pageProps as { readonly dehydratedState?: DehydratedState };
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ReactQueryConfigProvider config={reactQueryConfigOverrides}>
        <ToastContextProvider>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </ToastContextProvider>
      </ReactQueryConfigProvider>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
