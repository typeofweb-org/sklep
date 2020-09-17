import { Column } from 'carbon-components-react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/admin/Header';
import { AdminProducts } from '../../../components/admin/adminProducts/AdminProducts';
import { ContentWrapper } from '../../../components/admin/contentWrapper/ContentWrapper';

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Admin page</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Header />
      <ContentWrapper>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          <AdminProducts />
        </Column>
      </ContentWrapper>
    </>
  );
}
