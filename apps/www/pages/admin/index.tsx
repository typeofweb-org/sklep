import Head from 'next/head';
import React from 'react';

import { Container } from '../../components/admin/container/Container';
import { ProductsForm } from '../../components/admin/productsForm/ProductsForm';

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
