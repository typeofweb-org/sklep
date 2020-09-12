import { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemImage } from './image/CartItemImage';
import { CartQuantityButton } from './quantity/CartQuantityButton';
import { CartQuantityInput } from './quantity/CartQuantityInput';
import { RemoveButton } from './removeButton/RemoveButton';

// temporary type
type CartItemProps = {
  product: SklepTypes['getProducts200Response']['data'][number];
};

export const CartItem = React.memo<CartItemProps>(({ product }) => {
  const increaseQuantity = () => console.log('incr');
  const decreaseQuantity = () => console.log('decr');
  const removeItemFromCart = () => console.log('rmv');

  return (
    <tr className="border border-gray-300 border-t-0 border-r-0 border-l-0">
      <td className="py-6 w-20 h-24 align-top">
        <CartItemImage />
      </td>
      <td className="px-4 py-6">
        <div>
          <h3 className="mb-2">{product.name}</h3>
          <div className="">
            <CartQuantityButton text="-" onClick={decreaseQuantity} />
            <CartQuantityInput />
            <CartQuantityButton text="+" onClick={increaseQuantity} />
          </div>
        </div>
      </td>
      <td className="px-4 py-6 relative">
        {product.regularPrice}
        <RemoveButton onClick={removeItemFromCart} />
      </td>
    </tr>
  );
});
CartItem.displayName = 'CartItem';
