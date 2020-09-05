import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { PhotoPlaceholder } from 'react-placeholder-image';

import { Product } from '../../../../../types/product';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  return (
    <section className="">
      <PhotoPlaceholder width={600} height={600} />
      <div className="flex justify-between items-center pt-4">
        <p className="text-lg text-gray-700">{product.name}</p>
        <button className="">
          <FiHeart className="w-6 h-6 text-gray-700 hover:text-red-900 transform transition-colors duration-200" />
        </button>
      </div>
      <p className="pt-2">${product.regularPrice}</p>
    </section>
  );
});
ProductItem.displayName = 'ProductItem';
