import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemRow } from '../item/CartItem';

type CartListProps = {
  readonly cart: SklepTypes['postCart200Response']['data'];
};

export const CartList = React.memo<CartListProps>(({ cart }) => {
  return (
    <div className="w-full md:w-2/3 mb-4 px-4">
      <h3 className="text-2xl">Koszyk zakupowy</h3>
      <table className="table-fixed">
        <tbody>
          {cart.cartProducts.map((cartProduct) => (
            <CartItemRow key={cartProduct.product.id} cartProduct={cartProduct} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
CartList.displayName = 'CartList';
