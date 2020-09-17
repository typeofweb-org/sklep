import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemRow } from '../item/CartItem';

type CartListProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const CartList = React.memo<CartListProps>(({ products }) => {
  return (
    <div className="w-full md:w-2/3 mb-4 px-4">
      <h3 className="text-2xl">Koszyk zakupowy</h3>
      <table className="table-fixed">
        <tbody>
          {products.map((product) => (
            <CartItemRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
CartList.displayName = 'CartList';
