import type { SklepTypes } from '@sklep/types';
import React, { useState } from 'react';

import { CartItemRow } from '../item/CartItem';

type CartListProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const CartList = React.memo<CartListProps>(({ products }) => {
  const [getProducts, setProducts] = useState(products);

  const removeProduct = React.useCallback(
    (id: number) => {
      const products = getProducts.filter((x) => {
        return x.id !== id;
      });
      setProducts(products);
    },
    [getProducts],
  );

  return (
    <div className="w-full md:w-2/3 mb-4 px-4">
      <h3 className="text-2xl">Koszyk zakupowy</h3>
      <table className="table-fixed">
        <tbody>
          {getProducts.map((product) => (
            <CartItemRow key={product.id} product={product} handleRemoveProduct={removeProduct} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
CartList.displayName = 'CartList';
