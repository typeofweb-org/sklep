import Head from 'next/head';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = React.memo<LayoutProps>(({ children, title }) => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-200 min-h-screen container mx-auto">
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:200,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className="leading-normal">{children}</main>
    </div>
  );
});
Layout.displayName = 'Layout';
