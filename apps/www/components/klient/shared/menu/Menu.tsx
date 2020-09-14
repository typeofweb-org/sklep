import Link from 'next/link';
import React from 'react';

import { UserIcon } from '../icons/UserIcon';

type MenuProps = {
  isMenuOpen: boolean;
};

export const Menu = React.memo<MenuProps>(({ isMenuOpen }) => {
  return (
    <div
      className={`${
        isMenuOpen ? 'flex' : 'hidden'
      } md:flex md:items-center md:w-auto w-full order-3 md:order-1`}
    >
      <nav>
        <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
          <li className="no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer">
            <Link href="/">Sklep</Link>
          </li>
          <li className="no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer">
            <Link href="/o-nas">O nas</Link>
          </li>
          <li className="md:hidden">
            <Link href="/profil">
              <div className="flex gap-1 py-2 px-4">
                <span>Profil</span>
                <UserIcon className="fill-current text-gray-600 hover:text-black cursor-pointer" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

Menu.displayName = 'Menu';
