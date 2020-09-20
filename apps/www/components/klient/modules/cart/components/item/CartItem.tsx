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
  const MAX_PRODUCT_QUANTITY: number = 99;
  const MIN_PRODUCT_QUANTITY: number = 1;

  const [quantity, setQuantity] = useState(MIN_PRODUCT_QUANTITY);

  const increaseQuantity = useCallback(
    () => setQuantity((quantity) => (MAX_PRODUCT_QUANTITY <= quantity ? quantity : quantity + 1)),
    [],
  );
  const decreaseQuantity = useCallback(
    () => setQuantity((quantity) => (quantity <= MIN_PRODUCT_QUANTITY ? quantity : quantity - 1)),
    [],
  );

  const handleChangeQuantity = (event: {
    readonly currentTarget: { readonly value: React.SetStateAction<number> };
  }) =>
    event.currentTarget.value > MAX_PRODUCT_QUANTITY ||
    event.currentTarget.value < MIN_PRODUCT_QUANTITY
      ? setQuantity(1)
      : setQuantity(event.currentTarget.value);

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
