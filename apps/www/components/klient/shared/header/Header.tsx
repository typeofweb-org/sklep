import Link from 'next/link';
import React from 'react';

import { IconLinks } from '../iconLinks/IconLinks';
import { BagIcon } from '../icons/BagIcon';
import { HamburgerIcon } from '../icons/HamburgerIcon';
import { Menu } from '../menu/Menu';

export const Header = React.memo(() => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <header className="z-30 xl:container top-0 py-1 mx-auto w-full">
      <div className="w-full flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <button className="md:hidden block p-2" onClick={toggleMenu} aria-label="Menu">
          <HamburgerIcon className="fill-current text-gray-900" />
        </button>

        <div className="order-2 md:order-3">
          <Link href="/">
            <a className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
              <BagIcon className="hidden md:block fill-current text-gray-800 mr-2" />
              <span className="text-base sm:text-lg">Sklep TypeOfWeb</span>
            </a>
          </Link>
        </div>
        <IconLinks />
        <Menu isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
});
Header.displayName = 'Header';
