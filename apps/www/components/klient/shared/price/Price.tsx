import React from 'react';

type PriceProps = {
  regularPrice: number;
  discountPrice?: number | null;
};

export const Price = React.memo<PriceProps>(({ regularPrice, discountPrice }) => {
  if (!discountPrice) {
    return <p className="pt-1 text-gray-900">${regularPrice}</p>;
  }
  return (
    <p className="pt-1 text-gray-900">
      <del className="text-gray-600">${regularPrice}</del> ${discountPrice}
    </p>
  );
});
Price.displayName = 'Price';
