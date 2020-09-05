import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';

import { Product } from '../../../../types/product';

import { ProductItem } from './product/Product';

type ProductCollectionProps = {
  products: Product[];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  return (
    <article className="w-full p-4">
      <header className="flex justify-between items-center pb-6">
        <h3 className="text-2xl font-bold">STORE</h3>
        <div className="flex">
          <FaSort className="w-6 h-6 mr-2 text-gray-700" />
          <BiSearch className="w-6 h-6 text-gray-700" />
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </article>
  );
});
ProductCollection.displayName = 'ProductCollection';
