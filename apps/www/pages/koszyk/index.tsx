import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { Cart } from '../../components/klient/modules/cart/Cart';
import { Header } from '../../components/klient/shared/header/Header';
import { Layout } from '../../components/klient/shared/layout/Layout';
import { Order } from '../../types/order';

function CartPage({ order }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Sklep strona główna">
      <Header />
      <Cart order={order} />
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

export default CartPage;
