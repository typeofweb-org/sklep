import Head from 'next/head';
import type { ReactNode } from 'react';
import React from 'react';
import { useIsFetching } from 'react-query';

import { BetaNotification } from '../betaNotification/BetaNotification';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

type LayoutProps = {
  readonly children: ReactNode;
  readonly title: string;
};

export const LoadingIndicator = () => {
  const isFetching = useIsFetching() > 0;

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('react-query-is-loading', isFetching);
    }
  }, [isFetching]);

  return null;
};

export const Layout = React.memo<LayoutProps>(({ children, title }) => {
  const fullTitle = title.trim() ? `${title.trim()} | Sklep Type of Web` : 'Sklep Type of Web';
  return (
    <div className="font-sans antialiased text-gray-900 min-h-screen bg-white">
      <Head>
        <title>{fullTitle}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:200,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <main className="leading-normal">{children}</main>
      <Footer />
      <LoadingIndicator />
      <BetaNotification />
    </div>
  );
});
Layout.displayName = 'Layout';
