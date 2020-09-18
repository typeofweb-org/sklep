import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { ProductItem } from './components/product/Product';
import { Wrapper } from './components/wrapper/Wrapper';

type ProductCollectionProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Wrapper>
  );
});
ProductCollection.displayName = 'ProductCollection';
