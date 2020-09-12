import clsx from 'clsx';
import React, { useCallback } from 'react';

type PriceProps = {
  regularPrice: number;
  discountPrice?: number | null;
  direction?: 'row' | 'column';
};

export const Price = React.memo<PriceProps>(
  ({ regularPrice, discountPrice, direction = 'row' }) => {
    const priceClassName = clsx('pt-1 text-gray-900 flex', direction === 'column' && 'flex-col');
    const discountClassName = direction === 'column' ? 'pl-0' : 'pl-2';

    const toLocaleCurrency = useCallback((price: number): string => {
      return price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
      });
    }, []);

    if (!discountPrice) {
      return <p className="pt-1 text-gray-900">${toLocaleCurrency(regularPrice)}</p>;
    }

    return (
      <p className={priceClassName}>
        <del className="text-gray-600 text-sm">${toLocaleCurrency(regularPrice)}</del>{' '}
        <span className={discountClassName}>${toLocaleCurrency(discountPrice)}</span>
      </p>
    );
  },
);
Price.displayName = 'Price';
