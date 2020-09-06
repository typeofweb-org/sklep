import Head from 'next/head';
import React from 'react';

import { ProductsForm } from '../../components/admin/ProductsForm/ProductsForm';
import { Container } from '../../components/admin/container/Container';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Admin</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Container>
        <ProductsForm />
      </Container>
    </>
  );
}
