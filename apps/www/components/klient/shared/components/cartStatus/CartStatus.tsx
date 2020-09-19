import Link from 'next/link';
import React from 'react';

import { useCart } from '../../utils/useCart';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

export const CartStatus = React.memo(() => {
  const { itemsInCart } = useCart();

  return (
    <Link href="/koszyk">
      <a>
        <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
        items: {itemsInCart}
      </a>
    </Link>
  );
});

CartStatus.displayName = 'CartStatus';
