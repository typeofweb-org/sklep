import React from 'react';

import { Product } from '../../../../../types/product';
import { HeartIcon } from '../../../shared/icons/HeartIcon';
import { ShoppingCartIcon } from '../../../shared/icons/ShoppingCartIcon';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  return (
    <section className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col self-start">
      <div className="hover:grow hover:shadow-lg">
        <img src="https://picsum.photos/400" alt="Placeholder" className="w-full" />
      </div>
      <button className="bg-gray-900 text-white w-full rounded-sm mt-2 p-2 shadow-sm">
        <div className="flex justify-center transform transition-transform duration-200 hover:scale-105">
          <ShoppingCartIcon />
          <p className="ml-4 self-end">Do koszyka</p>
        </div>
      </button>
      <div className="flex justify-between items-center pt-2">
        <p className="text-gray-600 pr-2">{product.name}</p>
        <div className="flex self-start">
          <button aria-label="Ulubione" className="pl-3 inline-block" title="Dodaj do ulubionych">
            <HeartIcon />
          </button>
        </div>
      </div>
      <p className="pt-1 text-gray-900">${product.regularPrice}</p>
    </section>
  );
});
ProductItem.displayName = 'ProductItem';
