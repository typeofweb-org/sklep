import React from 'react';

import { CartItemImage } from '../../../../shared/image/CartItemImage';

type CheckoutItemProps = {
  readonly cartItem: {
    readonly quantity: number;
    readonly product?:
      | {
          readonly id: number;
          readonly name: string;
          readonly slug: string;
          readonly regularPrice: number;
          readonly discountPrice?: number | undefined | null;
        }
      | undefined
      | null;
  };
};

export const CheckoutItem = React.memo<CheckoutItemProps>(({ cartItem }) => {
  if (!cartItem) {
    return null;
  }
  const { quantity, product } = cartItem;
  return (
    <tr>
      <td className="w-20 h-24 py-2">
        <CartItemImage />
      </td>
      <td className="px-2 w-2/6 sm:w-1/2">
        <p className="">{product && product.name}</p>
      </td>
      <td className="px-2">x{quantity}</td>
      <td className="pr-4 text-right w-20">
        <p className="">{product && product.regularPrice} zł</p>
      </td>
    </tr>
  );
});

CheckoutItem.displayName = 'CheckoutItem';
