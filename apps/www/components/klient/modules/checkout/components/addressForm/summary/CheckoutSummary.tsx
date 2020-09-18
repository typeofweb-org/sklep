import React from 'react';

import { CartList } from './CartList';
import { CheckoutTotal } from './CheckoutTotal';

export type CartProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const CheckoutSummary = React.memo<CartProps>(({ products }) => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
      <CartList products={products} />
      <CheckoutTotal />
    </div>
  );
});
