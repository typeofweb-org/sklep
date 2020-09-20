import React from 'react';
import * as Yup from 'yup';

import type { Order } from '../../../../types/order';
import { FinalFormWrapper } from '../../utils/formUtils';

import { AddressForm } from './components/addressForm/AddressForm';
import { CheckoutSummary } from './components/summary/CheckoutSummary';

type CheckoutProps = {
  readonly order: Order;
  readonly products: SklepTypes['getProducts200Resporeadonly nse']['data'];
};

const checkoutSchema = Yup.object({
  firstName: Yup.string().required('Pole jest wymagane'),
  lastName: Yup.string().required('Pole jest wymagane'),
  streetName: Yup.string().required('Pole jest wymagane'),
  houseNumber: Yup.number().required('Pole jest wymagane'),
  shippment: Yup.string().required('Pole jest wymagane'),
});
export const Checkout = React.memo<CheckoutProps>(({ order, products }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <FinalFormWrapper
      schema={checkoutSchema}
      onSubmit={handleSubmit}
      className="container mx-auto flex flex-col md:flex-row px-2 pb-12 worksans py-8"
    >
      <AddressForm />
      <CheckoutSummary products={products} />
    </FinalFormWrapper>
  );
});
Checkout.displayName = 'Checkout';
