import Link from 'next/link';
import React from 'react';

import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { UserIcon } from '../icons/UserIcon';

export const IconLinks = React.memo(() => (
  <div className="order-2 md:order-3 flex items-center">
    <span className="hidden md:contents">
      <Link href="/profil" className="hidden md:inline-block">
        <a>
          <UserIcon className="fill-current text-gray-600 hover:text-black cursor-pointer" />
        </a>
      </Link>
    </span>

    <Link href="/koszyk">
      <a>
        <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
      </a>
    </Link>
  </div>
));
