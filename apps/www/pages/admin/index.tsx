import { Column } from 'carbon-components-react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/admin/Header';
import { ContentWrapper } from '../../components/admin/contentWrapper/ContentWrapper';
import { LoginForm } from '../../components/admin/loginForm/LoginForm';
import { ProductsForm } from '../../components/admin/productsForm/ProductsForm';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Panel admina</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Header />
      <ContentWrapper>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          <LoginForm />
        </Column>
      </ContentWrapper>
    </>
  );
}
