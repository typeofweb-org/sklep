import type { SklepTypes } from '@sklep/types';
import React, { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '../../../../../../utils/hooks';
import { Price } from '../../../../shared/components/price/Price';
import { CartItemImage } from '../../../../shared/image/CartItemImage';
import { useCart } from '../../../../shared/utils/useCart';

import { CartQuantityButton } from './quantity/CartQuantityButton';
import { CartQuantityInput } from './quantity/CartQuantityInput';
import { RemoveButton } from './removeButton/RemoveButton';

type CartItemRowProps = {
  readonly cartProduct: SklepTypes['postCart200Response']['data']['cartProducts'][number];
};

function handleError(err: unknown) {
  console.error(err);
}

const MIN_PRODUCT_QUANTITY = 1;
const MAX_PRODUCT_QUANTITY = 99;
const CART_UPDATES_DEBOUNCE = 200;

export const CartItemRow = React.memo<CartItemRowProps>(({ cartProduct }) => {
  const { removeFromCart, setCartQuantity } = useCart();

  const [quantity, setQuantity] = useState(cartProduct.quantity);
  useEffect(() => {
    setQuantity(cartProduct.quantity);
  }, [cartProduct]);

  const increaseQuantity = useCallback(() => {
    if (cartProduct.quantity < MAX_PRODUCT_QUANTITY) {
      setQuantity((quantity) => quantity + 1);
    }
  }, [cartProduct.quantity]);

  const decreaseQuantity = useCallback(() => {
    if (cartProduct.quantity > MIN_PRODUCT_QUANTITY) {
      setQuantity((quantity) => quantity - 1);
    }
  }, [cartProduct.quantity]);

  const debouncedQuantity = useDebounce(quantity, CART_UPDATES_DEBOUNCE);
  const saveCartQuantity = useCallback(
    (quantity: number) => setCartQuantity({ productId: cartProduct.product.id, quantity }),
    [cartProduct.product.id, setCartQuantity],
  );
  useEffect(() => {
    saveCartQuantity(debouncedQuantity).catch(handleError);
  }, [debouncedQuantity, saveCartQuantity]);

  const removeItemFromCart = useCallback(() => removeFromCart(cartProduct.product.id), [
    cartProduct.product.id,
    removeFromCart,
  ]);

  const handleChangeQuantity = React.useCallback<React.FormEventHandler<HTMLInputElement>>(
    (event) => {
      const currentValue = Number.parseInt(event.currentTarget.value, 10);

      if (currentValue > MAX_PRODUCT_QUANTITY || currentValue < MIN_PRODUCT_QUANTITY) {
        setQuantity(1);
      } else {
        setQuantity(currentValue);
      }
    },
    [],
  );

  return (
    <tr className="border border-gray-300 border-t-0 border-r-0 border-l-0">
      <td className="py-6 w-20 h-24 align-top">
        <CartItemImage />
      </td>
      <td className="px-4 py-6">
        <div>
          <h3 className="mb-2">{cartProduct.product.name}</h3>
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
          regularPrice={cartProduct.product.regularPrice}
          discountPrice={cartProduct.product.discountPrice}
          direction="column"
        />
        <RemoveButton onClick={removeItemFromCart} />
      </td>
    </tr>
  );
});
CartItemRow.displayName = 'CartItemRow';
