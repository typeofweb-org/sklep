import React from 'react';

import { Product } from '../../../../types/product';

type FeaturedProductProps = {
  product: Product;
};

export const FeaturedProduct = React.memo<FeaturedProductProps>(({ product }) => {
  return (
    <div className="">
      <div key={product.id}>{product.id}</div>
    </div>
  );
});
FeaturedProduct.displayName = 'FeaturedProduct';
