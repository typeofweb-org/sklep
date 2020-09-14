import React from 'react';

import { Product } from '../../../../../types/product';
import { AddToCartButton } from '../../../shared/addToCartButton/AddToCartButton';
import { Amount } from '../amount/Amount';

type ContentProps = {
  product: Product;
};

export const Content = React.memo<ContentProps>(({ product }) => (
  <div className="w-5/12">
    <h1 className="text-2xl mb-2">{product.name}</h1>
    <p className="mb-2 text-lg text-orange-600">
      {Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
        product.regularPrice,
      )}
    </p>
    <p className="text-base text-gray-600 leading-6">{product.description}</p>
    <div className="w-2/3">
      <Amount amount={1} increaseAmount={() => {}} decreaseAmount={() => {}} />
      <AddToCartButton onClick={() => {}} />
    </div>
  </div>
));
