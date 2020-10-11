import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { fetcher } from '../../../../../utils/fetcher';

export function useStripePayment() {
  const stripe = useStripe();
  const elements = useElements();

  const cardElement = elements?.getElement(CardElement);
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const [payloadError, setPayloadError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetcher(`/orders/initiate-stripe-payment`, 'PATCH', {});
      setClientSecret(data.stripeClientSecret);
    }
    void fetchData();
  }, []);

  async function pay() {
    if (!stripe || !cardElement || !clientSecret) {
      throw new Error('Something went wrong');
    }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (payload.error) {
      setPayloadError(payload.error.message);
    } else {
      setPayloadError(undefined);
    }
  }

  const [stripePayMutation, { isLoading, isSuccess }] = useMutation(pay, {});

  const processPayment = React.useCallback(() => stripePayMutation(), [stripePayMutation]);

  return React.useMemo(
    () => ({
      processPayment: processPayment,
      isLoading: isLoading,
      isSuccess: isSuccess,
      payloadError: payloadError,
    }),
    [isLoading, isSuccess, payloadError, processPayment],
  );
}
