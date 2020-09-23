import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminSingleProduct } from '../../../components/admin/adminSingleProduct/AdminSingleProduct';

export default function SingleProductPage() {
  return (
    <>
      <Head>
        <title>Panel admina, podstrona produktu</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <AdminLayout>
        <AdminSingleProduct />
      </AdminLayout>
    </>
  );
}
