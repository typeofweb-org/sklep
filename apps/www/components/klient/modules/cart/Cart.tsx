import React from 'react';

import { Order } from '../../../../types/order';

type CartProps = {
  order: Order;
};
export const Cart = React.memo<CartProps>(({ order }) => {
  return <div className="">Cartid: {order.id}</div>;
});
Cart.displayName = 'Cart';
