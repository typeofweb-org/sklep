import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/components/layout/Layout';

function CheckoutPage() {
  const cart = {
    data: {
      id: '1',
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
      regularSubTotal: 2020,
      discountSubTotal: 2020,
      cartProducts: [
        {
          quantity: 1,
          product: {
            id: 1,
            name: 'Pierwszy produkt w koszyku',
            slug: 'Pierwszy produkt w koszyku',
            regularPrice: 1245,
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
      <Checkout cart={cart} />
    </Layout>
  );
}

export default CheckoutPage;
