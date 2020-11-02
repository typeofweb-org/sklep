import clsx from 'clsx';
import React from 'react';

import { formatCurrency } from '../../../../../utils/currency';

type PriceProps = {
  readonly regularPrice: number;
  readonly discountPrice?: number | null;
  readonly direction?: 'row' | 'column';
};

export const Price = React.memo<PriceProps>(
  ({ regularPrice, discountPrice, direction = 'row' }) => {
    const priceClassName = clsx(
      'pt-1 text-gray-900 flex items-end',
      direction === 'column' && 'flex-col',
    );
    const discountClassName = direction === 'column' ? 'pl-0' : 'pl-2';

    if (!discountPrice) {
      return <p className="text-gray-900">{formatCurrency(regularPrice / 100)}</p>;
    }

    return (
      <p className={priceClassName}>
        <del className="text-gray-600 text-sm">{formatCurrency(regularPrice / 100)}</del>{' '}
        <ins className={discountClassName}>{formatCurrency(discountPrice / 100)}</ins>
      </p>
    );
  },
);
Price.displayName = 'Price';
