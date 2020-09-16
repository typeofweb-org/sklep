import React from 'react';

import type { Product } from '../../../../types/product';

type FeaturedProductProps = {
  readonly product: Product;
};

export const FeaturedProduct = React.memo<FeaturedProductProps>(({ product }) => {
  return (
    <div className="">
      <div key={product.id}>{product.id}</div>
    </div>
  );
});
FeaturedProduct.displayName = 'FeaturedProduct';
