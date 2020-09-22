import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { ProductItem } from './components/product/Product';
import { ProductCollectionWrapper } from './components/wrapper/ProductCollectionWrapper';

type ProductCollectionProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  return (
    <ProductCollectionWrapper>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductCollectionWrapper>
  );
});
ProductCollection.displayName = 'ProductCollection';
