import { Content, Column } from 'carbon-components-react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/admin/Header';
import { LoginForm } from '../../components/admin/loginForm/LoginForm';
import styles from '../../components/admin/loginForm/LoginForm.module.scss';
import { ProductsForm } from '../../components/admin/productsForm/ProductsForm';
import { ProductsList } from '../../components/admin/productsList/ProductsList';
import { createProduct } from '../../utils/api/createProduct';

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
      <Content className={styles.contentWraper}>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          <LoginForm />
          <ProductsForm mode="Normal" mutation={createProduct} />
          <ProductsList products={[]} title="" description="" />
        </Column>
      </Content>
    </>
  );
}
