import React from 'react';

import type { Order } from '../../../../types/order';

type CheckoutProps = {
  readonly order: Order;
};
export const Checkout = React.memo<CheckoutProps>(({ order }) => {
  return <div className="">Checkoutid: {order.id}</div>;
});
Checkout.displayName = 'Checkout';
