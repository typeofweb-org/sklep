import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/admin/Header';
import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminProducts } from '../../../components/admin/adminProducts/AdminProducts';
import { ProductsForm } from '../../../components/admin/productsForm/ProductsForm';
import { createProduct } from '../../../utils/api/createProduct';

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
      <AdminLayout>
        <ProductsForm mode="ADDING" mutation={createProduct} />
        <AdminProducts />
      </AdminLayout>
    </>
  );
}
