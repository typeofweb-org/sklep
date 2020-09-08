import React from 'react';

import { Cart } from '../../components/klient/modules/cart/Cart';
import { Layout } from '../../components/klient/shared/layout/Layout';
import { Order } from '../../types/order';

function CartPage() {
  const order: Order = {
    id: '345',
  };
  return (
    <Layout title="Sklep strona główna">
      <Cart order={order} />
    </Layout>
  );
}

export default CartPage;
