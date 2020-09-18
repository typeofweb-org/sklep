import Link from 'next/link';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';

import { createCart } from '../../../../utils/api/createCart';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

export const CartStatus = React.memo(() => {
  const [mutate] = useMutation(createCart);

  useEffect(() => {
    async function createCartMutation() {
      await mutate();
    }
    createCartMutation();
  }, [mutate]);

  return (
    <Link href="/koszyk">
      <a>
        <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
        {/*items: {data?.cartProducts.length ? data?.cartProducts.length : 0}*/}
      </a>
    </Link>
  );
});

CartStatus.displayName = 'CartStatus';
