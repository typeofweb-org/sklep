import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';
import { ProductsForm } from '../../components/admin/productsForm/ProductsForm';
import { createProduct } from '../../utils/api/createProduct';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Panel admina - Dodawanie produktu</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <AdminLayout>
        <ProductsForm mode="ADDING" mutation={createProduct} />
      </AdminLayout>
    </>
  );
}
