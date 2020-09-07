import Head from 'next/head';
import React, { ReactNode } from 'react';

import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = React.memo<LayoutProps>(({ children, title }) => {
  return (
    <div className="font-sans antialiased text-gray-900 min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="leading-normal">{children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = 'Layout';
