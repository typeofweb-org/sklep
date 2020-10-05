import type { SklepTypes } from '@sklep/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import * as Yup from 'yup';

import { FinalFormWrapper } from '../../utils/formUtils';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';
import { useCheckoutDispatch, useCheckoutState } from './utils/checkoutContext';

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
  const dispatch = useCheckoutDispatch();
  const state = useCheckoutState();
  const stripe = useStripe();
  const elements = useElements();

  const cardElement = elements?.getElement(CardElement);

  const handleSubmit = async (values: CheckoutType) => {
    console.log(values);
    dispatch({ type: 'PROCESS', payload: true });
    if (!stripe || !cardElement) {
      dispatch({ type: 'PROCESS', payload: false });
      return;
    }
    const payload = await stripe.confirmCardPayment(state.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (payload.error) {
      dispatch({ type: 'ERROR', payload: payload.error.message });
      dispatch({ type: 'PROCESS', payload: false });
    } else {
      dispatch({ type: 'SUCCESS', payload: true });
      dispatch({ type: 'PROCESS', payload: false });
    }
  };

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
        <CheckoutSummary cart={cart} />
      </FinalFormWrapper>
      {state.succeeded && <p className="w-screen text-center text-green-600 text-4xl">Udało się</p>}
    </>
  );
});

Checkout.displayName = 'Checkout';
