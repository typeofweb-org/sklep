import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
import { ReactQueryCacheProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryCacheProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
