import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { Button } from '../../../../shared/button/Button';
import { CheckoutList } from '../list/CheckoutList';

import { PaymentMethod } from './payment/PaymentMethod';
import { CheckoutTotal } from './total/CheckoutTotal';

export type CheckoutSummaryProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

export const CheckoutSummary = React.memo<CheckoutSummaryProps>(({ cart }) => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
      <CheckoutList cart={cart} />
      <CheckoutTotal cart={cart} />
      <PaymentMethod />
      <Button type="submit">Złóż zamówienie</Button>
    </div>
  );
});

CheckoutSummary.displayName = 'CheckoutSummary';
