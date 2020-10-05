import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminProducts } from '../../../components/admin/adminProducts/AdminProducts';

export default function AdminProductsPage() {
  return (
    <>
      <Head>
        <title>Produkty</title>
      </Head>
      <AdminLayout>
        <AdminProducts />
      </AdminLayout>
    </>
  );
}
