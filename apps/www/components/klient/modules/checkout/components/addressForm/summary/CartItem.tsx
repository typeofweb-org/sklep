import { SklepTypes } from '@sklep/types';
import React from 'react';

import { CartItemImage } from '../../../../cart/components/item/image/CartItemImage';

type CartItemProps = {
  product: SklepTypes['getProducts200Response']['data'][number];
};

export const CartItem = React.memo<CartItemProps>(({ product }) => {
  return (
    <div>
      <div className="flex px-2">
        <div className="w-20 h-24 mr-2">
          <CartItemImage />
        </div>
        <div className="flex justify-between w-full">
          <p className="w-2/3">{product.name}</p>
          <p className="">{product.regularPrice}</p>
        </div>
      </div>
    </div>
  );
});
