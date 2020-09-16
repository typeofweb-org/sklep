import React from 'react';

import { Order } from '../../../../types/order';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/addressForm/summary/CheckoutSummary';

type CheckoutProps = {
  order: Order;
};
export const Checkout = React.memo<CheckoutProps>(({ order }) => {
  return (
    <section className="bg-white worksans py-8">
      <div className="container mx-auto flex flex-col md:flex-row px-2 pt-4 pb-12">
        <AddressForm />
        <CheckoutSummary />
      </div>
    </section>
  );
});
Checkout.displayName = 'Checkout';
