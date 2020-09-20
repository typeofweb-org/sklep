import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
import { ProductInfo } from './productInfo/ProductInfo';

type FeaturedProductProps = {
  readonly product: SklepTypes['getProducts200Response']['data'][number];
};

export const FeaturedProduct = React.memo<FeaturedProductProps>(({ product }) => {
  return (
    <section className="w-full bg-gray-200 pb-24">
      <div className="container mx-auto">
        <div className="w-full px-6">
          <Breadcrumbs productName={product.name} />
          <div className="md:flex justify-between">
            <div className="w-full md:w-5/12 mb-8 md:mb-0">
              <img
                className="w-full h-auto"
                src="https://picsum.photos/600/600"
                alt={`Zdjęcie ${product.name}`}
              />
            </div>
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </section>
  );
});
FeaturedProduct.displayName = 'FeaturedProduct';
