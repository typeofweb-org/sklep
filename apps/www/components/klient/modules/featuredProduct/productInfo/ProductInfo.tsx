import React from 'react';

import { Product } from '../../../../../types/product';
import { AddToCartButton } from '../../../shared/addToCartButton/AddToCartButton';
import { Price } from '../../../shared/price/Price';
import { Amount } from '../amount/Amount';

type ContentProps = {
  product: Product;
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
