import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import type { ReactQueryConfig } from 'react-query';
import { ReactQueryCacheProvider, QueryCache, ReactQueryConfigProvider } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from 'react-query-devtools';
import type { DehydratedState } from 'react-query/hydration';
import { Hydrate } from 'react-query/hydration';

const queryCache = new QueryCache();
const reactQueryConfigOverrides: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
  mutations: {
    throwOnError: true,
  },
} as const;

function MyApp({ Component, pageProps }: AppProps) {
  const { dehydratedState } = pageProps as { readonly dehydratedState?: DehydratedState };
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ReactQueryConfigProvider config={reactQueryConfigOverrides}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </ReactQueryConfigProvider>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
