import type { InferGetStaticPropsType } from 'next';
import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Header } from '../../components/klient/shared/components/header/Header';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import type { Order } from '../../types/order';

function CheckoutPage({ order }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Sklep strona główna">
      <Header />
      <Checkout order={order} />
    </Layout>
  );
}
export const getStaticProps = async () => {
  // const res = await fetch('https://.../')

  // todo: change with api call result
  const order: Order = {
    id: '345',
  };

  return {
    props: {
      order,
    },
    revalidate: 1, // In seconds
  };
};

export default CheckoutPage;
