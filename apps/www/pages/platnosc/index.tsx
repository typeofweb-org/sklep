import React from 'react';

import { Checkout } from '../../components/klient/modules/checkout/Checkout';
import { Layout } from '../../components/klient/shared/layout/Layout';

function CheckoutPage() {
  const order = {
    id: '123',
  };

  const products = [
    {
      id: 123,
      name: 'Product Name',
      description: 'desc',
      slug: '123',
      isPublic: true,
      regularPrice: 1234,
      productType: 'footwear',
    },
    {
      id: 345,
      name: 'To jest dłuższa prawdziwa nazwa bardzo bardzo duluga da',
      description: 'desc',
      slug: '345',
      isPublic: true,
      regularPrice: 3454,
      discountPrice: 12,
    },
    {
      id: 346,
      name: 'Beautiful socks',
      description: 'desc',
      slug: '346',
      isPublic: true,
      regularPrice: 3454,
      discountPrice: 1234,
    },
    {
      id: 347,
      name: 'Beautiful socks 2',
      description: 'desc',
      slug: '347',
      isPublic: true,
      regularPrice: 3454,
      discountPrice: 12,
    },
  ] as SklepTypes['getProducts200Response']['data'];

  return (
    <Layout title="Płatność i realizacja">
      <Checkout order={order} products={products} />
    </Layout>
  );
}

export default CheckoutPage;
