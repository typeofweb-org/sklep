import { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartList } from './components/list/CartList';
import { CartTotal } from './components/total/CartTotal';

type CartProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const Cart = React.memo<CartProps>(({ products }) => {
  return (
    <section className="cart bg-white worksans py-8">
      <div className="container mx-auto flex flex-wrap px-2 pt-4 pb-12">
        <CartList products={products} />
        <CartTotal />
      </div>
    </section>
  );
});
Cart.displayName = 'Cart';
