import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemImage } from '../../../../shared/image/CartItemImage';

type CheckoutItemProps = {
  readonly cartItem: SklepTypes['postCart200Response'];
};

export const CheckoutItem = React.memo<CheckoutItemProps>(({ cartItem }) => {
  const { quantity, product } = cartItem;
  return (
    <tr>
      <td className="w-20 h-24 py-2">
        <CartItemImage />
      </td>
      <td className="px-2">
        <p className="">{product.name}</p>
      </td>
      <td className="px-2">x{quantity}</td>
      <td className="px-2">
        <p className="">{product.regularPrice} zł</p>
      </td>
    </tr>
  );
});

CheckoutItem.displayName = 'CheckoutItem';
