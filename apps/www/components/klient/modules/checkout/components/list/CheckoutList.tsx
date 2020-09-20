import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CheckoutItem } from '../item/CheckoutItem';

type CartListProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

export const CheckoutList = React.memo<CartListProps>(({ cart }) => {
  if (!cart) {
    return null;
  }
  const products = cart.data.cartProducts;
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {products &&
          products.map(
            (product) =>
              product.product && <CheckoutItem key={product.product.id} cartItem={product} />,
          )}
      </tbody>
    </table>
  );
});

CheckoutList.displayName = 'CheckoutList';
