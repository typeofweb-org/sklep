import { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItem } from '../item/CartItem';

type CartListProps = {
  products: SklepTypes['getProducts200Response']['data'];
};

export const CartList = React.memo<CartListProps>(({ products }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-2/3 mb-4">
      <h3 className="text-2xl">Koszyk zakupowy</h3>
      <table className="table-fixed">
        <tbody>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
CartList.displayName = 'CartList';
