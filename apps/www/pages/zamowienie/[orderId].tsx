import React from 'react';

import { CheckoutInProgress } from '../../components/klient/modules/checkout/CheckoutInProgress';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useParams } from '../../utils/hooks';

export default function SingleOrderPage() {
  const orderId = String(useParams(['orderId']).orderId);

  return <Layout title="Płatność">{orderId && <CheckoutInProgress orderId={orderId} />}</Layout>;
}
