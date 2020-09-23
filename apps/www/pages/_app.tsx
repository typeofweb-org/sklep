import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';
import type { DehydratedState } from 'react-query/hydration';
import { Hydrate } from 'react-query/hydration';

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }: AppProps) {
  const { dehydratedState } = pageProps as { readonly dehydratedState?: DehydratedState };
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={dehydratedState}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
