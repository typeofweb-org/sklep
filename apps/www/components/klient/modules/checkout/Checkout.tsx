import React from 'react';

import { Order } from '../../../../types/order';

type CheckoutProps = {
  order: Order;
};
export const Checkout = React.memo<CheckoutProps>(({ order }) => {
  return <div className="">Checkoutid: {order.id}</div>;
});
Checkout.displayName = 'Checkout';
