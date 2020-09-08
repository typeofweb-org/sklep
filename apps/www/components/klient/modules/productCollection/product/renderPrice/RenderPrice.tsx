import React from 'react';

interface RenderPriceProps {
  regularPrice: number;
  discountPrice?: number;
}

export const RenderPrice = ({ regularPrice, discountPrice }: RenderPriceProps) => {
  if (!discountPrice) {
    return <p className="pt-1 text-gray-900">${regularPrice}</p>;
  }
  return (
    <p className="pt-1 text-gray-900">
      <del className="text-gray-600">${regularPrice}</del> ${discountPrice}
    </p>
  );
};
