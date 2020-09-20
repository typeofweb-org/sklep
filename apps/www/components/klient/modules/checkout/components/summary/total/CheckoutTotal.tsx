import React from 'react';

import { ShippmentMethod } from '../shippment/ShippmentMethod';

export const CheckoutTotal = React.memo(() => {
  return (
    <div>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between border-b border-gray-400 w-full p-4">
          <span>Kwota</span>
          <span>2020 zł</span>
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
