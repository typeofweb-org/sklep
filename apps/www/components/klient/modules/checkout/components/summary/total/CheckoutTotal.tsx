import type { SklepTypes } from '@sklep/types';
import React from 'react';

import { ShippmentMethod } from '../shippment/ShippmentMethod';

type CheckoutTotalProps = {
  readonly cart: SklepTypes['postCart200Response'];
};

export const CheckoutTotal = React.memo<CheckoutTotalProps>(({ cart }) => {
  const {
    data: { regularSubTotal },
  } = cart;
  return (
    <div>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between border-b border-gray-400 w-full p-4">
          <span>Kwota</span>
          <span>{regularSubTotal} zł</span>
        </div>
        <ShippmentMethod />
        <div className="flex justify-between w-full p-4 text-2xl">
          <span>Do zapłaty</span>
          <span>2020 zł</span>
        </div>
      </div>
    </div>
  );
});

CheckoutTotal.displayName = 'CheckoutTotal';
