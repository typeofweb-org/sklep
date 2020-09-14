import React from 'react';

import { Product } from '../../../../types/product';

import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
import { Content } from './content/Content';
type FeaturedProductProps = {
  product: Product;
};

export const FeaturedProduct = React.memo<FeaturedProductProps>(({ product }) => {
  return (
    <section className="w-full bg-gray-200 pb-24">
      <div className="container mx-auto">
        <div className="w-full px-6">
          <Breadcrumbs productName={product.name} />
          <div className="flex justify-between">
            <div className="w-5/12">
              <img
                className="w-full h-auto"
                src="https://picsum.photos/600/600"
                alt={`Zdjęcie ${product.name}`}
              />
            </div>
            <Content product={product} />
          </div>
        </div>
      </div>
    </section>
  );
});
FeaturedProduct.displayName = 'FeaturedProduct';
