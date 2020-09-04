import Head from 'next/head';
import React from 'react';

import { Container } from '../../components/admin/Container/Container';
import { ItemsForm } from '../../components/admin/ItemsForm/ItemsForm';

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
      {/* Pass here your content */}
      <Container>
        <ItemsForm />
      </Container>
    </>
  );
}
