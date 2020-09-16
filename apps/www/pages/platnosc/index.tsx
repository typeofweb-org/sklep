import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/layout/Layout';

function CheckoutPage() {
  const order = {
    id: '123',
  };

  return (
    <Layout title="Płatność i realizacja">
      <Checkout order={order} />
    </Layout>
  );
}

export default CheckoutPage;
