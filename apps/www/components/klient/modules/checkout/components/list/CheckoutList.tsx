import React from 'react';

import { CheckoutItem } from '../item/CheckoutItem';

type CartListProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const CheckoutList = React.memo<CartListProps>(({ products }) => {
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {products.map((product) => (
          <CheckoutItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
});
