import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CheckoutItem } from '../item/CheckoutItem';

type CartListProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

export const CheckoutList = React.memo<CartListProps>(({ cart }) => {
  const products = cart.cartProducts;
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {products.map((product) => (
          <CheckoutItem key={product.id} cartItem={product} />
        ))}
      </tbody>
    </table>
  );
});

CheckoutList.displayName = 'CheckoutList';
