import { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemImage } from '../../../cart/components/item/image/CartItemImage';

type CheckoutItemProps = {
  product: SklepTypes['getProducts200Response']['data'][number];
};

export const CheckoutItem = React.memo<CheckoutItemProps>(({ product }) => {
  return (
    <tr>
      <td className="w-20 h-24 py-2">
        <CartItemImage />
      </td>
      <td className="px-2">
        <p className="">{product.name}</p>
      </td>
      <td className="px-2">x1</td>
      <td className="px-2">
        <p className="">{product.regularPrice}</p>
      </td>
    </tr>
  );
});
