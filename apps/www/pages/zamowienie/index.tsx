import { Elements } from '@stripe/react-stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useCart } from '../../components/klient/shared/utils/useCart';

const getStripe = (() => {
  // https://github.com/stripe/stripe-js/issues/43#issuecomment-643840075
  // lazy-load stripe only when checkout page is opened
  let mutableStripePromise: Promise<Stripe | null> | undefined;
  return () => {
    if (!mutableStripePromise) {
      if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
        throw new Error('Missing process.env.NEXT_PUBLIC_STRIPE_KEY!');
      }

      mutableStripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    }
    return mutableStripePromise;
  };
})();

function CheckoutPage() {
  const { cartResponseData } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartResponseData && !cartResponseData.totalQuantity) {
      void router.replace('/');
    }
  }, [cartResponseData, router]);

  return (
    <Layout title="Płatność i realizacja">
      <Elements stripe={getStripe()}>
        {cartResponseData?.cartProducts && <Checkout cart={cartResponseData} />}
      </Elements>
    </Layout>
  );
}

export default CheckoutPage;
