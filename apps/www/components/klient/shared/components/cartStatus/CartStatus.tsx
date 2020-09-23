import Link from 'next/link';
import React from 'react';

import { useCart } from '../../utils/useCart';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

export const CartStatus = React.memo(() => {
  const { itemsInCart } = useCart();

  return (
    <div className="relative">
      <Link href="/koszyk">
        <a>
          <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
          {itemsInCart > 0 && (
            <div className="absolute right-0 top-0 -mt-4 -mr-4 rounded-full bg-blue-400 w-5 h-5 text-center text-white text-xs flex items-center justify-center">
              {itemsInCart}
            </div>
          )}
        </a>
      </Link>
    </div>
  );
});

CartStatus.displayName = 'CartStatus';
