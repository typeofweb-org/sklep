import React from 'react';

import { Order } from '../../../../types/order';

import { CartTotal } from './components/cartTotal/CartTotal';
import { ShoppingList } from './components/shoppingList/ShoppingList';

type CartProps = {
  order: Order;
};
export const Cart = React.memo<CartProps>(({ order }) => {
  return (
    <section className="bg-white worksans py-8">
      {order.id}
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <ShoppingList />
        <CartTotal />
      </div>
    </section>
  );
});
Cart.displayName = 'Cart';
