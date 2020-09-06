import { Content, Column } from 'carbon-components-react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/admin/Header';
import { ProductsForm } from '../../components/admin/ProductsForm/ProductsForm';

export default function AdminHome() {
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

      <Content>
        <Column lg={{ offset: 3 }}>
          <ProductsForm />
        </Column>
      </Content>
    </>
  );
}
