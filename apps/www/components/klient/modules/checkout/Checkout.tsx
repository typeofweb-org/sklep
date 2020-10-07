import type { SklepTypes } from '@sklep/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { fetcher } from '../../../../utils/fetcher';
import { FinalFormWrapper } from '../../utils/formUtils';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';

type CheckoutProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

const checkoutSchema = Yup.object({
  firstName: Yup.string().required('Pole jest wymagane'),
  lastName: Yup.string().required('Pole jest wymagane'),
  streetName: Yup.string().required('Pole jest wymagane'),
  houseNumber: Yup.string().required('Pole jest wymagane'),
  city: Yup.string().required('Pole jest wymagane'),
  zipCode: Yup.string().required('Pole jest wymagane'),
  shippment: Yup.string().required('Pole jest wymagane'),
}).required();

export type CheckoutType = Yup.InferType<typeof checkoutSchema>;

export const Checkout = React.memo<CheckoutProps>(({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const cardElement = elements?.getElement(CardElement);

  async function stripePayment() {
    const { data } = await fetcher(`/orders/initiate-stripe-payment`, 'PATCH', {});
    if (!stripe || !cardElement || !data.stripeClientSecret) {
      throw new Error('Something went wrong');
    }
    const payload = await stripe.confirmCardPayment(data.stripeClientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (payload.error?.message) {
      setError(`Payment failed ${payload.error.message}`);
    } else {
      setError(null);
    }
  }

  const [mutate, { isLoading, isSuccess, isError, status }] = useMutation(stripePayment, {
    onError() {
      console.log(status);
      console.log(isError);
    },
  });

  const handleSubmit = useCallback(() => {
    void mutate();
  }, [mutate]);

  return (
    <>
      <FinalFormWrapper
        schema={checkoutSchema}
        onSubmit={handleSubmit}
        initialValues={{
          shippment: 'poczta',
        }}
        className="container mx-auto flex flex-col md:flex-row px-2 pb-12 worksans py-8"
      >
        <AddressForm />
        <CheckoutSummary cart={cart} processing={isLoading} />
      </FinalFormWrapper>
      {isSuccess && !error && (
        <p className="w-screen text-center text-green-600 text-4xl">Udało się</p>
      )}
      {error && <p className="w-screen text-center text-red-600 text-4xl">{error}</p>}
    </>
  );
});
