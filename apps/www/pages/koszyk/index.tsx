import { SklepTypes } from '@sklep/types';
import React from 'react';

import { Cart } from '../../components/klient/modules/cart/Cart';
import { Layout } from '../../components/klient/shared/layout/Layout';

function CartPage() {
  // todo: change with api call result
  // api koszyka nie będzie zwracać samej tabeli z produktami,
  // tymczasowo korzystam z tabeli z produktami ale brakuje tu
  // chociażby ceny sumarycznej za cały koszyk, informacji o userze itd.
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
      discountPrice: 1234.2,
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
    <Layout title="Sklep strona główna">
      <Cart products={products} />
    </Layout>
  );
}

export default CartPage;
