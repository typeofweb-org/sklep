import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';

export default function AdminHomePage() {
  return (
    <>
      <Head>
        <title>Panel admina</title>
      </Head>
      <AdminLayout />
    </>
  );
}
