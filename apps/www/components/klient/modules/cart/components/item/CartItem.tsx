import type { SklepTypes } from '@sklep/types';
import React, { useCallback } from 'react';

import { Price } from '../../../../shared/price/Price';

import { CartItemImage } from './image/CartItemImage';
import { CartQuantityButton } from './quantity/CartQuantityButton';
import { CartQuantityInput } from './quantity/CartQuantityInput';
import { RemoveButton } from './removeButton/RemoveButton';

// temporary type
type CartItemRowProps = {
  readonly product: SklepTypes['getProducts200Response']['data'][number];
  readonly handleRemoveProduct: React.EventHandler<any>;
};

export const CartItemRow = React.memo<CartItemRowProps>(({ product, handleRemoveProduct }) => {
  const increaseQuantity = useCallback(() => () => console.log('incr'), []);
  const decreaseQuantity = useCallback(() => () => console.log('decr'), []);

  return (
    <tr className="border border-gray-300 border-t-0 border-r-0 border-l-0">
      <td className="py-6 w-20 h-24 align-top">
        <CartItemImage />
      </td>
      <td className="px-4 py-6">
        <div>
          <h3 className="mb-2">{product.name}</h3>
          <div className="">
            <CartQuantityButton
              text="-"
              onClick={decreaseQuantity}
              ariaLabel="zwiększ liczbę sztuk"
            />
            <CartQuantityInput />
            <CartQuantityButton
              text="+"
              onClick={increaseQuantity}
              ariaLabel="zmniejsz liczbę sztuk"
            />
          </div>
        </div>
      </td>
      <td className="px-4 py-6 relative">
        <Price
          regularPrice={product.regularPrice}
          discountPrice={product.discountPrice}
          direction="column"
        />
        <RemoveButton onClick={() => handleRemoveProduct(product.id)} />
      </td>
    </tr>
  );
});
CartItemRow.displayName = 'CartItemRow';
