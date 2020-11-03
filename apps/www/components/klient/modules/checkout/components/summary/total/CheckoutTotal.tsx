import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { formatCurrency } from '../../../../../../../utils/currency';
import { Price } from '../../../../../shared/components/price/Price';
import { ShippmentMethod } from '../shippment/ShippmentMethod';

type CheckoutTotalProps = {
  readonly cart: SklepTypes['postCart200Response']['data'];
};

export const CheckoutTotal = React.memo<CheckoutTotalProps>(({ cart }) => {
  return (
    <div>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between border-b border-gray-400 w-full p-4">
          <span>Kwota</span>
          <Price regularPrice={cart.regularSubTotal} discountPrice={cart.discountSubTotal} />
        </div>
        <ShippmentMethod />
        <div className="flex justify-between w-full p-4 text-2xl">
          <span>Do zapłaty</span>
          {/* @todo add shipping cost */}
          <span>{formatCurrency(cart.discountSubTotal / 100)}</span>
        </div>
      </div>
    </div>
  );
});

CheckoutTotal.displayName = 'CheckoutTotal';
