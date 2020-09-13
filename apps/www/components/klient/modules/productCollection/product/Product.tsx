import React, { useCallback } from 'react';

import { Product } from '../../../../../types/product';
import { HeartIcon } from '../../../shared/icons/HeartIcon';
import { ShoppingCartIcon } from '../../../shared/icons/ShoppingCartIcon';
import { Price } from '../../../shared/price/Price';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  const { name, regularPrice, discountPrice } = product;

  const addToCart = useCallback(() => console.log('add to cart'), []);

  return (
    <section className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col self-start">
      <div className="hover:grow hover:shadow-lg">
        <img src="https://picsum.photos/400" alt="Placeholder" className="w-full" />
      </div>
      <button className="bg-gray-900 hover:bg-gray-800 transform transition-color duration-200 text-white w-full rounded-sm mt-2 shadow-sm">
        <div className="w-full flex justify-center p-2">
          <ShoppingCartIcon className={'fill-current'} />
          <p className="ml-4 self-end">Do koszyka</p>
        </div>
      </button>
      <div className="flex justify-between items-center pt-2">
        <p className="text-gray-600 pr-2">{name}</p>
        <div className="flex self-start">
          <button aria-label="Ulubione" className="pl-3 inline-block" title="Dodaj do ulubionych">
            <HeartIcon />
          </button>
        </div>
      </div>
      <Price regularPrice={regularPrice} discountPrice={discountPrice} />
    </section>
  );
});
ProductItem.displayName = 'ProductItem';
