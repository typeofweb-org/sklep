import { useRouter } from 'next/router';
import React from 'react';

import { CheckoutInProgress } from '../../components/klient/modules/checkout/CheckoutInProgress';
import { Layout } from '../../components/klient/shared/components/layout/Layout';

export default function SingleOrderPage() {
  const router = useRouter();
  const orderId = String(router.query.orderId);

  return (
    <Layout title="Płatność">
      {router.query.orderId && <CheckoutInProgress orderId={orderId} />}
    </Layout>
  );
}
