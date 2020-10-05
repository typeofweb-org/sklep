import { CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { useEffect } from 'react';

import { initiateStripePayment } from '../../../../../../../utils/api/initiateStripePayment';
import { useCheckoutDispatch, useCheckoutState } from '../../../utils/checkoutContext';

export const StripeCard = React.memo(() => {
  const dispatch = useCheckoutDispatch();
  const { error } = useCheckoutState();
  const handleChange = (event: StripeCardElementChangeEvent) => {
    dispatch({ type: 'DISABLE', payload: event.empty });
    dispatch({ type: 'ERROR', payload: event.error ? event.error.message : '' });
  };

  useEffect(() => {
    void initiateStripePayment().then((data) =>
      dispatch({ type: 'CLIENTSECRET', payload: data.data.stripeClientSecret }),
    );
  }, [dispatch]);

  const cardOptions = {
    hidePostalCode: true,
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
  return (
    <div className="border border-blue-700">
      <CardElement id="card-element" options={cardOptions} onChange={handleChange} />
      {error && <p className="text-sm text-red-600 px-2">{error}</p>}
    </div>
  );
});

StripeCard.displayName = 'StripeCard';
