import type { SklepTypes } from '@sklep/types';
import React from 'react';
import { useFormState } from 'react-final-form';

import { Button } from '../../../../shared/button/Button';
import { CheckoutList } from '../list/CheckoutList';

import { PaymentMethod } from './payment/PaymentMethod';
import { CheckoutTotal } from './total/CheckoutTotal';

export type CheckoutSummaryProps = {
  readonly cart: SklepTypes['postCart200Response'];
  readonly processing: boolean;
};

export const CheckoutSummary = React.memo<CheckoutSummaryProps>(({ cart, processing }) => {
  const state = useFormState();
  console.log(state);

  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
      <CheckoutList cart={cart} />
      <CheckoutTotal cart={cart} />
      <PaymentMethod />
      <Button type="submit" disabled={state.invalid}>
        {processing ? <div className="spinner text-lg" id="spinner"></div> : 'Zapłać'}
      </Button>
    </div>
  );
});

CheckoutSummary.displayName = 'CheckoutSummary';
