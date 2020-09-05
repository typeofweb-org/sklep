import React from 'react';

import { Product } from '../../../../types/product';

import { ProductItem } from './product/Product';

type ProductCollectionProps = {
  products: Product[];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  return (
    <div className="">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
});
ProductCollection.displayName = 'ProductCollection';
