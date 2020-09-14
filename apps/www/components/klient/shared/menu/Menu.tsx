import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { UserIcon } from '../icons/UserIcon';

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
          <li className="no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer">
            <Link href="/">
              <a>Sklep</a>
            </Link>
          </li>
          <li className="no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer">
            <Link href="/o-nas">
              <a>O nas</a>
            </Link>
          </li>
          <li className="md:hidden">
            <Link href="/profil">
              <a className="flex gap-1 py-2 px-4">
                <span>Profil</span>
                <UserIcon className="fill-current text-gray-600 hover:text-black cursor-pointer" />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

Menu.displayName = 'Menu';
