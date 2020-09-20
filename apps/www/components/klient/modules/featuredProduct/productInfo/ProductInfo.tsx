import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { Price } from '../../../shared/components/price/Price';
import { AddToCartButton } from '../../productCollection/components/product/components/addToCartButton/AddToCartButton';
import { Amount } from '../amount/Amount';

type ContentProps = {
  readonly product: SklepTypes['getProducts200Response']['data'][number];
};

export const ProductInfo = React.memo<ContentProps>(({ product }) => (
  <div className="w-full md:w-5/12">
    <h1 className="text-2xl mb-2">{product.name}</h1>
    <Price regularPrice={product.regularPrice} discountPrice={product.discountPrice} />
    <p className="text-base text-gray-600 leading-6 mt-2">{product.description}</p>
    <div className="w-full md:w-2/3">
      <Amount amount={1} increaseAmount={() => {}} decreaseAmount={() => {}} />
      <AddToCartButton onClick={() => {}} />
    </div>
  </div>
));

ProductInfo.displayName = 'Amount';
