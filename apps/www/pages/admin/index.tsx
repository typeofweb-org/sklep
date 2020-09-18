import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/admin/Header';
import { AdminLayout } from '../../components/admin/adminLayout/AdminLayout';
import { LoginForm } from '../../components/admin/loginForm/LoginForm';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Panel admina</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Header />
      <AdminLayout>
        <LoginForm />
      </AdminLayout>
    </>
  );
}
