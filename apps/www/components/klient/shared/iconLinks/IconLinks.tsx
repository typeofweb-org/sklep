import Link from 'next/link';
import React from 'react';

import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { UserIcon } from '../icons/UserIcon';

export const IconLinks = React.memo(() => (
  <div className="order-2 md:order-3 flex items-center">
    <span className="hidden md:contents">
      <Link href="/profil" className="hidden md:inline-block">
        <UserIcon className="fill-current text-gray-600 hover:text-black cursor-pointer" />
      </Link>
    </span>

    <Link href="/koszyk">
      <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
    </Link>
  </div>
));
