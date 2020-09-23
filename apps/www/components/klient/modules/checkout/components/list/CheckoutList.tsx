import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CheckoutItemRow } from '../item/CheckoutItemRow';

type CartListProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

export const CheckoutList = React.memo<CartListProps>(({ cart }) => {
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {cart.data.cartProducts.map((cartProduct) => (
          <CheckoutItemRow key={cartProduct.product.id} cartProduct={cartProduct} />
        ))}
      </tbody>
    </table>
  );
});

CheckoutList.displayName = 'CheckoutList';
