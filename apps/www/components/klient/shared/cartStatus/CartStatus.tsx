import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { createCart } from '../../../../utils/api/createCart';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

export const CartStatus = React.memo(() => {
  const { data } = useQuery('cart', createCart);

  return (
    <Link href="/koszyk">
      <a>
        <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
        items: {JSON.stringify(data)}
      </a>
    </Link>
  );
});

CartStatus.displayName = 'CartStatus';
