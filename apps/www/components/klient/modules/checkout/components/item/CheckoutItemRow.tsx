import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { Price } from '../../../../shared/components/price/Price';
import { CartItemImage } from '../../../../shared/image/CartItemImage';

type CheckoutItemProps = {
  readonly cartProduct: SklepTypes['cartProducts'][number];
};

export const CheckoutItemRow = React.memo<CheckoutItemProps>(({ cartProduct }) => {
  const { quantity, product } = cartProduct;
  return (
    <tr>
      <td className="w-20 h-24 py-2">
        <CartItemImage />
      </td>
      <td className="px-2 w-2/6 sm:w-1/2">
        <p>{product.name}</p>
      </td>
      <td className="px-2">x{quantity}</td>
      <td className="pr-4 text-right w-20">
        <Price
          regularPrice={product.regularPrice}
          discountPrice={product.discountPrice}
          direction="column"
        />
      </td>
    </tr>
  );
});

CheckoutItemRow.displayName = 'CheckoutItemRow';
