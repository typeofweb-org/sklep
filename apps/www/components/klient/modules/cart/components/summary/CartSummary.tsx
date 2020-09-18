import Link from 'next/link';
import React from 'react';

import { Button } from '../../../../shared/button/Button';

export const CartSummary = React.memo(() => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Podsumowanie</h3>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between p-4 text-2xl border-t border-gray-300">
          <h4>Razem</h4>
          <span>2020 zł</span>
        </div>
      </div>
      <Link href="/platnosc">
        <a>
          <Button>Przejdź do płatności</Button>
        </a>
      </Link>
    </div>
  );
});
CartSummary.displayName = 'CartSummary';
