import { CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React from 'react';

import { useCheckoutDispatch } from '../../../utils/checkoutContext';

export const StripeCard = React.memo(() => {
  const dispatch = useCheckoutDispatch();
  const handleChange = (event: StripeCardElementChangeEvent) => {
    dispatch({ type: 'DISABLE', payload: event.empty });
    dispatch({ type: 'ERROR', payload: event.error ? event.error.message : '' });
  };

  const cardOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return <CardElement id="card-element" options={cardOptions} onChange={handleChange} />;
});

StripeCard.displayName = 'StripeCard';
