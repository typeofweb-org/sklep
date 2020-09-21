import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminProducts } from '../../../components/admin/adminProducts/AdminProducts';

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
      <AdminLayout>
        <AdminProducts />
      </AdminLayout>
    </>
  );
}
