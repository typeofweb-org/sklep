import React from 'react';

import { Order } from '../../../../types/order';
import { Button } from '../../shared/button/Button';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';

type CheckoutProps = {
  order: Order;
  products: SklepTypes['getProducts200Response']['data'];
};
export const Checkout = React.memo<CheckoutProps>(({ order, products }) => {
  return (
    <section className="bg-white worksans py-8">
      <div className="container mx-auto flex flex-col md:flex-row px-2 pt-4 pb-12">
        <AddressForm />
        <CheckoutSummary products={products} />
      </div>
    </section>
  );
});
Checkout.displayName = 'Checkout';
