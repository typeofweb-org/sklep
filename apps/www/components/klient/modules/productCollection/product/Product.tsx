import React from 'react';

import { Product } from '../../../../../types/product';
import { HeartIcon } from '../../../shared/icons/HeartIcon';

import { AddToCartButton } from './addToCartButton/AddToCartButton';
import { ProductImage } from './productImage/ProductImage';
import { RenderPrice } from './renderPrice/RenderPrice';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(({ product }) => {
  const { name, regularPrice, discountPrice } = product;

  const addToCart = () => {};

  return (
    <section className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col self-start">
      <ProductImage />
      <AddToCartButton onClick={addToCart} />
      <div className="flex justify-between items-center pt-2">
        <p className="text-gray-600 pr-2">{name}</p>
        <div className="flex self-start">
          <button aria-label="Ulubione" className="pl-3 inline-block" title="Dodaj do ulubionych">
            <HeartIcon />
          </button>
        </div>
      </div>
      <RenderPrice regularPrice={regularPrice} discountPrice={discountPrice} />
    </section>
  );
});
ProductItem.displayName = 'ProductItem';
