import { CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React from 'react';
import { Field } from 'react-final-form';

import { FormErrorMessage } from '../../formErrorMessage/FormErrorMessage';

export const StripeCard = React.memo(() => {
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

  const emptyOrErrors = (value: StripeCardElementChangeEvent) => {
    if (value) {
      return value.error ? value.error.message : undefined;
    }
    return 'Pole jest wymagane';
  };

  return (
    <Field name="stripeCard" validate={emptyOrErrors}>
      {({ input, meta }) => (
        <div className="border border-blue-700 p-2">
          <CardElement
            id="card-element"
            options={cardOptions}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
          />
          <FormErrorMessage meta={meta} />
        </div>
      )}
    </Field>
  );
});

StripeCard.displayName = 'StripeCard';
