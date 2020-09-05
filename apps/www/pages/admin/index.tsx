import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/admin/Header';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Admin page</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components/css/carbon-components.min.css"
        />
      </Head>
      <Header />
    </>
  );
}
