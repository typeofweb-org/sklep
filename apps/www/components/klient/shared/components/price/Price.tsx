import clsx from 'clsx';
import React from 'react';

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
      return <p className="text-gray-900">{regularPrice / 100}&nbsp;PLN</p>;
    }

    return (
      <p className={priceClassName}>
        <del className="text-gray-600 text-sm">{regularPrice / 100}&nbsp;PLN</del>{' '}
        <ins className={discountClassName}>{discountPrice / 100}&nbsp;PLN</ins>
      </p>
    );
  },
);
Price.displayName = 'Price';
