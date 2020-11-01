import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';

export default function AdminProductsPage() {
  return (
    <>
      <Head>
        <title>Status zamówienia</title>
      </Head>
      <AdminLayout></AdminLayout>
    </>
  );
}
