import Head from 'next/head';
import React from 'react';

import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';
import { LoginForm } from '../../components/admin/loginForm/LoginForm';

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Logowanie</title>
      </Head>
      <AdminLayout allowUnauthorized={true} hideHud={true}>
        <LoginForm />
      </AdminLayout>
    </>
  );
}
