import React from 'react';

import { Product } from '../../../../../types/product';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  return (
    <div className="">
      <div key={product.id}>{product.id}</div>
    </div>
  );
});
ProductItem.displayName = 'ProductItem';
