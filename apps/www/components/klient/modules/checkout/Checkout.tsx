import type { SklepTypes } from '@sklep/types';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { FinalFormWrapper } from '../../utils/formUtils';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';
import { useStripePayment } from './utils/useStripePayment';

type CheckoutProps = {
  readonly cart: SklepTypes['postCart200Response']['data'];
};

export type AddressDetails = {
  readonly firstName: string;
  readonly lastName: string;
  readonly streetName: string;
  readonly houseNumber: string;
  readonly apartmentNumber: string;
  readonly city: string;
  readonly zipCode: string;
  readonly phone: string;
  readonly email: string;
};

const checkoutSchema = Yup.object({
  firstName: Yup.string().required('Pole jest wymagane'),
  lastName: Yup.string().required('Pole jest wymagane'),
  streetName: Yup.string().required('Pole jest wymagane'),
  houseNumber: Yup.string().required('Pole jest wymagane'),
  apartmentNumber: Yup.string(),
  city: Yup.string().required('Pole jest wymagane'),
  zipCode: Yup.string().required('Pole jest wymagane'),
  phone: Yup.string().required('Pole jest wymagane'),
  email: Yup.string().email().required('Pole jest wymagane'),
  shippment: Yup.string().required('Pole jest wymagane'),
}).required();

export type CheckoutType = Yup.InferType<typeof checkoutSchema>;

export const Checkout = React.memo<CheckoutProps>(({ cart }) => {
  const router = useRouter();
  const [processPayment, { isLoading }] = useStripePayment();

  const handleSubmit = React.useCallback(
    async (values: AddressDetails) => {
      const response = await processPayment(values);
      if (response?.orderId) {
        await router.replace(`/zamowienie/${response.orderId}`);
      }
    },
    [processPayment, router],
  );

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
      {/* @todo błędy płatności */}
    </>
  );
});

Checkout.displayName = 'Checkout';
