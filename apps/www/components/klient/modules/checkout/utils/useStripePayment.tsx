import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { fetcher } from '../../../../../utils/fetcher';
import { CART_QUERY_KEY } from '../../../shared/utils/useCart';

export function useStripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const queryCache = useQueryCache();

  const pay = React.useCallback(async () => {
    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !cardElement) {
      throw new Error('Missing Stripe elements');
    }

    const {
      data: { stripeClientSecret },
    } = await fetcher(`/orders/initiate-stripe-payment`, 'PATCH', {});

    if (!stripeClientSecret) {
      throw new Error(`Couldn't obtain stripe client secret`);
    }

    const payload = await stripe.confirmCardPayment(stripeClientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (payload.error) {
      throw payload.error;
    }
    return payload.paymentIntent;
  }, [elements, stripe]);

  return useMutation(pay, {
    onSettled: () => queryCache.invalidateQueries(CART_QUERY_KEY),
  });
}
