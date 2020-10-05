import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';
import { ProductsForm } from '../../components/admin/productsForm/ProductsForm';
import { createProduct } from '../../utils/api/createProduct';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Dodawanie produktów</title>
      </Head>
      <AdminLayout>
        <ProductsForm mode="ADDING" mutation={createProduct} />
      </AdminLayout>
    </>
  );
}
