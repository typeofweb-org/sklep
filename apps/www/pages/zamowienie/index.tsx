import type { SklepTypes } from '@sklep/types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/components/layout/Layout';

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

function CheckoutPage() {
  const cart = {
    data: {
      id: '1',
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
      regularSubTotal: 2050,
      discountSubTotal: 2010,
      cartProducts: [
        {
          quantity: 1,
          product: {
            id: 1,
            name: 'Pierwszy produkt w koszyku',
            slug: 'Pierwszy produkt w koszyku',
            regularPrice: 1245,
            discountPrice: 1122,
          },
        },
        {
          quantity: 2,
          product: {
            id: 2,
            name: 'Skarpetki typu lux',
            slug: 'Skarpetki typu lux',
            regularPrice: 24,
          },
        },
      ],
    },
  } as SklepTypes['postCart200Response'];

  return (
    <Layout title="Płatność i realizacja">
      <Elements stripe={promise}>
        <Checkout cart={cart} />
      </Elements>
    </Layout>
  );
}

export default CheckoutPage;
