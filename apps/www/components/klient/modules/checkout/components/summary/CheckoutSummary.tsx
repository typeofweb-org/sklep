import React from 'react';

import { Button } from '../../../../shared/button/Button';
import { CheckoutList } from '../list/CheckoutList';

import { Payment } from './payment/Payment';
import { CheckoutTotal } from './total/CheckoutTotal';

export type CartProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const CheckoutSummary = React.memo<CartProps>(({ products }) => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
      <CheckoutList products={products} />
      <CheckoutTotal />
      <Payment />
      <Button ariaLabel="Złóż zamówienie" type="submit">
        Złóż zamówienie
      </Button>
    </div>
  );
});
