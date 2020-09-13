import Link from 'next/link';
import React from 'react';

import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { UserIcon } from '../icons/UserIcon';

export const IconLinks = React.memo(() => (
  <div className="order-2 md:order-3 flex items-center">
    <Link href="/profil">
      <a className="inline-block no-underline" aria-label="Koszyk" title="Koszyk">
        <UserIcon />
      </a>
    </Link>

    <Link href="/koszyk">
      <a className="pl-3 inline-block no-underline" aria-label="Koszyk" title="Koszyk">
        <ShoppingCartIcon className={'fill-current text-gray-600 hover:text-black'} />
      </a>
    </Link>
  </div>
));
