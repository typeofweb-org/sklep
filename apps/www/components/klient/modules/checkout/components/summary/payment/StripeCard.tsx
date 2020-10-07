import { CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { useState } from 'react';

import type { PaymentMethodProps } from './PaymentMethod';

export const StripeCard = React.memo<PaymentMethodProps>(({ setDisabled }) => {
  const [stripeError, setStripeError] = useState<string | undefined>(undefined);

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty || !event.complete);
    if (event.error) {
      setStripeError(event.error.message);
    }
  };

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
      {stripeError && <p className="text-sm text-red-600 px-2">{stripeError}</p>}
    </div>
  );
});

StripeCard.displayName = 'StripeCard';
