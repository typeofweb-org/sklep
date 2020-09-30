import type { SklepTypes } from '@sklep/types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import * as Yup from 'yup';

import { FinalFormWrapper } from '../../utils/formUtils';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';
import { CheckoutProvider } from './utils/checkoutContext';

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

const promise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const Checkout = React.memo<CheckoutProps>(({ cart }) => {
  const handleSubmit = (values: CheckoutType) => {
    console.log(values);
  };

  return (
    <Elements stripe={promise}>
      <CheckoutProvider>
        <FinalFormWrapper
          schema={checkoutSchema}
          onSubmit={handleSubmit}
          className="container mx-auto flex flex-col md:flex-row px-2 pb-12 worksans py-8"
        >
          <AddressForm />
          <CheckoutSummary cart={cart} />
        </FinalFormWrapper>
      </CheckoutProvider>
    </Elements>
  );
});

Checkout.displayName = 'Checkout';
