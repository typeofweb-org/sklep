import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminSingleOrder } from '../../../components/admin/adminSingleOrder/AdminSingleOrder';

export default function AdminOrderStatusPage() {
  return (
    <>
      <Head>
        <title>Status zamówienia</title>
      </Head>
      <AdminLayout>
        <AdminSingleOrder />
      </AdminLayout>
    </>
  );
}
