import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';
import { Hydrate } from 'react-query/hydration';

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
