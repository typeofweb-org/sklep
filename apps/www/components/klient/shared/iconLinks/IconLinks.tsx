import Link from 'next/link';
import React from 'react';

import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

export const IconLinks = React.memo(() => (
  <div className="order-2 md:order-3 flex items-center">
    <Link href="/koszyk">
      <a>
        <ShoppingCartIcon className="fill-current text-gray-600 hover:text-black text-6xl ml-3 cursor-pointer" />
      </a>
    </Link>
  </div>
));
