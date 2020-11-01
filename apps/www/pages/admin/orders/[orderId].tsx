import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { AdminOrderStatus } from '../../../components/admin/adminOrderStatus/adminOrderStatus';

export default function AdminOrderStatusPage() {
  return (
    <>
      <Head>
        <title>Status zamówienia</title>
      </Head>
      <AdminLayout>
        <AdminOrderStatus />
      </AdminLayout>
    </>
  );
}
