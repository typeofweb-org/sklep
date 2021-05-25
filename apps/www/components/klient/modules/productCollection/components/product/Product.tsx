import type { SklepTypes } from '@sklep/types';
import Link from 'next/link';
import React from 'react';

import { Price } from '../../../../shared/components/price/Price';
import { useCart } from '../../../../shared/utils/useCart';

import { AddToCartButton } from './components/addToCartButton/AddToCartButton';
import { ProductDescription } from './components/description/ProductDescription';
import { ProductImage } from './components/image/ProductImage';

type Product = SklepTypes['getProducts200Response']['data'][number];

type ProductItemProps = {
  readonly product: Product;
};

export const ProductItem = React.memo<ProductItemProps>(
  ({ product: { name, regularPrice, discountPrice, slug, id } }) => {
    const { addToCart } = useCart();
    const handleAddToCartClick = React.useCallback(() => addToCart(id), [addToCart, id]);

    return (
      <section className="w-full md:w-1/3 xl:w-1/4 p-4 flex flex-col self-start">
        <Link href={`/produkty/${slug}`}>
          <a>
            <ProductImage />
          </a>
        </Link>
        <AddToCartButton onClick={handleAddToCartClick} />
        <ProductDescription name={name} />
        <Price regularPrice={regularPrice} discountPrice={discountPrice} />
      </section>
    );
  },
);

ProductItem.displayName = 'ProductItem';
