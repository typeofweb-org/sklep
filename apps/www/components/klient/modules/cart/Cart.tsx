import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartList } from './components/list/CartList';
import { CartSummary } from './components/summary/CartSummary';

export type CartProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const Cart = React.memo<CartProps>(({ products }) => {
  return (
    <section className="bg-white worksans py-8">
      <div className="container mx-auto flex flex-col md:flex-row px-2 pt-4 pb-12">
        <CartList products={products} />
        <CartSummary />
      </div>
    </section>
  );
});
Cart.displayName = 'Cart';
