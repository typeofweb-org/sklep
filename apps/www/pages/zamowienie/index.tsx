import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useCart } from '../../components/klient/shared/utils/useCart';

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

function CheckoutPage() {
  const { cartResponseData } = useCart();
  return (
    <Layout title="Płatność i realizacja">
      <Elements stripe={promise}>
        {cartResponseData?.cartProducts && <Checkout cart={cartResponseData} />}
      </Elements>
    </Layout>
  );
}

export default CheckoutPage;
