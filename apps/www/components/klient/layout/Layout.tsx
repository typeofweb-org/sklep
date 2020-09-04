import Head from 'next/head';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export const Layout = React.memo<LayoutProps>(({ children, title }) => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-200 min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="leading-normal">{children}</main>
    </div>
  );
});
Layout.displayName = 'Layout';
