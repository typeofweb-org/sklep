import type { SklepTypes } from '@sklep/types';
import Link from 'next/link';
import React from 'react';

import { Price } from '../../../../shared/components/price/Price';

type CartSummaryProps = {
  readonly cart: SklepTypes['postCart200Response']['data'];
};

export const CartSummary = React.memo<CartSummaryProps>(({ cart }) => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Podsumowanie</h3>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between p-4 text-2xl border-t border-gray-300">
          <h4>Razem</h4>
          <Price regularPrice={cart.regularSubTotal} discountPrice={cart.discountSubTotal} />
        </div>
      </div>
      <div className="bg-gray-900 text-white text-lg w-full rounded-sm mt-4 p-4 shadow-sm hover:bg-gray-800 text-center">
        <Link href="/zamowienie">
          <a>Przejdź do płatności</a>
        </Link>
      </div>
    </div>
  );
});
CartSummary.displayName = 'CartSummary';
