import React from 'react';

import { Cart } from '../../components/klient/modules/cart/Cart';
import { Layout } from '../../components/klient/shared/components/layout/Layout';

function CartPage() {
  return (
    <Layout title="Koszyk">
      <Cart />
    </Layout>
  );
}

export default CartPage;
