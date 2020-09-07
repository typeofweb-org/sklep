import React from 'react';

import { Product } from '../../../../types/product';

import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
type FeaturedProductProps = {
  product: Product;
};

export const FeaturedProduct = React.memo<FeaturedProductProps>(({ product }) => {
  return (
    <section className="w-full bg-gray-300">
      <div className="container mx-auto">
        <Breadcrumbs productName={product.name} />
      </div>
    </section>
  );
});
FeaturedProduct.displayName = 'FeaturedProduct';
