import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { fetcher } from '../../../../../utils/fetcher';
import { CART_QUERY_KEY } from '../../../shared/utils/useCart';
import type { AddressDetails } from '../Checkout';

export function useStripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const queryCache = useQueryCache();

  const pay = React.useCallback(
    async (addressDetails: AddressDetails) => {
      const cardElement = elements?.getElement(CardElement);

      if (!stripe || !cardElement) {
        throw new Error('Missing Stripe elements');
      }

      const {
        data: { stripeClientSecret, orderId },
      } = await fetcher(`/orders/initiate-stripe-payment`, 'PATCH', {
        params: undefined,
        query: undefined,
        body: addressDetails,
      });

      if (!stripeClientSecret) {
        throw new Error(`Couldn't obtain stripe client secret`);
      }

      const stripeResponse = await stripe.confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (stripeResponse.error) {
        throw stripeResponse.error;
      }
      return { paymentIntent: stripeResponse.paymentIntent, orderId };
    },
    [elements, stripe],
  );

  return useMutation(pay, {
    onSettled: () => queryCache.invalidateQueries(CART_QUERY_KEY),
  });
}
