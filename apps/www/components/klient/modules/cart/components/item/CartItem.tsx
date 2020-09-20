import type { SklepTypes } from '@sklep/types';
import React, { useCallback, useState } from 'react';

import { Price } from '../../../../shared/price/Price';

import { CartItemImage } from './image/CartItemImage';
import { CartQuantityButton } from './quantity/CartQuantityButton';
import { CartQuantityInput } from './quantity/CartQuantityInput';
import { RemoveButton } from './removeButton/RemoveButton';

// temporary type
type CartItemRowProps = {
  readonly product: SklepTypes['getProducts200Response']['data'][number];
};

export const CartItemRow = React.memo<CartItemRowProps>(({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = useCallback(
    () => (99 <= quantity ? null : setQuantity((quantity) => quantity + 1)),
    [quantity],
  );
  const decreaseQuantity = useCallback(
    () => (1 >= quantity ? null : setQuantity((quantity) => quantity - 1)),
    [quantity],
  );

  const handleChangeQuantity = (event) =>
    event.target.value > 99 || event.target.value < 1
      ? setQuantity(parseInt(1))
      : setQuantity(Number.parseInt(event.target.value, 10));

  const removeItemFromCart = useCallback(() => () => console.log('rmv'), []);

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
            <CartQuantityInput quantity={quantity} handleChangeQuantity={handleChangeQuantity} />
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
        <RemoveButton onClick={removeItemFromCart} />
      </td>
    </tr>
  );
});
CartItemRow.displayName = 'CartItemRow';
