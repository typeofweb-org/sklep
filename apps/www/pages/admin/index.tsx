import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Panel admina</title>
      </Head>
      <AdminLayout allowUnauthorized={false} hideHud={true} />
    </>
  );
}
