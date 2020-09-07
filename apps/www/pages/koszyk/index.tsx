import React from 'react';

import { Cart } from '../../components/klient/modules/cart/Cart';
import { Header } from '../../components/klient/shared/header/Header';
import { Layout } from '../../components/klient/shared/layout/Layout';
import { Order } from '../../types/order';

function CartPage() {
  const order: Order = {
    id: '345',
  };
  return (
    <Layout title="Sklep strona główna">
      <Header />
      Koszyk
      <Cart order={order} />
    </Layout>
  );
}

export default CartPage;
