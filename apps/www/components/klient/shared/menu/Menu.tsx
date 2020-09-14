import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { BagIcon } from '../icons/BagIcon';

type MenuProps = {
  isMenuOpen: boolean;
};

export const Menu = React.memo<MenuProps>(({ isMenuOpen }) => {
  const menuStyle = clsx(
    'md:flex md:items-center md:w-auto w-full order-3 md:order-1',
    isMenuOpen ? 'flex' : 'hidden',
  );

  return (
    <div className={menuStyle}>
      <nav>
        <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
          <li className="no-underline md:hover:text-black md:hover:underline cursor-pointer">
            <Link href="/">
              <a className="flex gap-1 py-2 px-4">
                <BagIcon className="md:hidden fill-current text-gray-600 hover:text-black cursor-pointer" />
                <span>Sklep</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

Menu.displayName = 'Menu';
