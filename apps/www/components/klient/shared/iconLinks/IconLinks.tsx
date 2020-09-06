import Link from 'next/Link';
import React from 'react';

import cartIconSrc from '../../../../assets/cart.svg';
import userIconSrc from '../../../../assets/user.svg';

export const IconLinks = React.memo(() => (
  <div className="order-2 md:order-3 flex items-center">
    <Link href="/profil">
      <a className="inline-block no-underline hover:text-black">
        <img src={userIconSrc} className="fill-current hover:text-black" alt="Profil użytkownika" />
      </a>
    </Link>

    <Link href="/koszyk">
      <a className="pl-3 inline-block no-underline hover:text-black">
        <img src={cartIconSrc} className="fill-current hover:text-black" alt="Koszyk" />
      </a>
    </Link>
  </div>
));
