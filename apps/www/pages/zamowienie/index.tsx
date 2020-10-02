import type { SklepTypes } from '@sklep/types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { CheckoutProvider } from '../../components/klient/modules/checkout/utils/checkoutContext';
import { Layout } from '../../components/klient/shared/components/layout/Layout';

const promise = loadStripe(
  'pk_test_51HXZFYFCiYl0PHOKhy4Qk2vJkOE4ij5TjOdmHcql1DSQxPULJuuDq2bRRgsVhvm2BkUhg4DvBCCPS7vuMzuZUh2x00X4AYgLw4',
);

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
      <CheckoutProvider>
        <Elements stripe={promise}>
          <Checkout cart={cart} />
        </Elements>
      </CheckoutProvider>
    </Layout>
  );
}

export default CheckoutPage;
