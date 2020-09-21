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
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {cart.data.cartProducts?.map(
          (cartProduct) =>
            cartProduct.product && (
              <CheckoutItem key={cartProduct.product.id} cartProduct={cartProduct} />
            ),
        )}
      </tbody>
    </table>
  );
});

CheckoutList.displayName = 'CheckoutList';
