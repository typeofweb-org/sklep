import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminOrders } from '../../../components/admin/adminOrders/AdminOrders';

export default function AdminOrdersPage() {
  return (
    <>
      <Head>
        <title>Zamówienia</title>
      </Head>
      <AdminLayout>
        <AdminOrders />
      </AdminLayout>
    </>
  );
}
