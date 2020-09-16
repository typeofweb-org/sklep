import { SklepTypes } from '@sklep/types';
import React, { useCallback } from 'react';

import { Price } from '../../../../shared/price/Price';

import { AddToCartButton } from './components/addToCartButton/AddToCartButton';
import { ProductDescription } from './components/description/ProductDescription';
import { ProductImage } from './components/image/ProductImage';

type ProductItemProps = {
  product: SklepTypes['getProducts200Response']['data'][number];
};

export const ProductItem = React.memo<ProductItemProps>(
  ({ product: { name, regularPrice, discountPrice } }) => {
    const addToCart = useCallback(() => console.log('add to cart'), []);

    return (
      <section className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col self-start">
        <ProductImage />
        <AddToCartButton onClick={addToCart} />
        <ProductDescription name={name} />
        <Price regularPrice={regularPrice} discountPrice={discountPrice} />
      </section>
    );
  },
);
ProductItem.displayName = 'ProductItem';
