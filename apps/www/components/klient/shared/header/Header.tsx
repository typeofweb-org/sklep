import Link from 'next/link';
import React from 'react';

import bagIconSrc from '../../../../assets/bag.svg';
import hamburgerIconSrc from '../../../../assets/hamburger.svg';
import { IconLinks } from '../iconLinks/IconLinks';
import { Menu } from '../menu/Menu';

export const Header = React.memo(() => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <header className="z-30 top-0 py-1 mx-auto w-full">
      <div className="w-full flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <button className="md:hidden block p-2" onClick={toggleMenu} aria-label="Menu">
          <img src={hamburgerIconSrc} className="fill-current text-gray-900" alt="Menu" />
        </button>

        <div className="order-2 md:order-3">
          <Link href="/">
            <a className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
              <img
                src={bagIconSrc}
                className="fill-current text-gray-800 mr-2"
                alt="Sklep TypeOfWeb"
              />
              <span className="text-sm sm:text-lg">Sklep TypeOfWeb</span>
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
