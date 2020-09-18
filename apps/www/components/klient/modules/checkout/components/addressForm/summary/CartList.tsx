import React from 'react';

import { CartItem } from './CartItem';

type CartListProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const CartList = React.memo<CartListProps>(({ products }) => {
  return (
    <table className="table-fixed mb-6">
      <tbody>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
});
