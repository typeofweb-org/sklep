import React from 'react';

import heartIcon from '../../../../../../www/assets/heartIcon.svg';
import { Product } from '../../../../../types/product';
import HeartIcon from '../../../shared/icons/HeartIcon';
import ShoppingCartIcon from '../../../shared/icons/ShoppingCartIcon';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  return (
    <section className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <div className="hover:grow hover:shadow-lg">
        <img src="https://picsum.photos/400" alt="Placeholder" className="w-full" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-wrap">
          <p className="text-gray-600">{product.name}</p>
        </div>
        <div className="flex">
          <button aria-label="Dodaj do koszyka" title="Dodaj do koszyka">
            <ShoppingCartIcon />
          </button>
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
