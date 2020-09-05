import Link from 'next/Link';
import React from 'react';

import { Menu } from '../menu/Menu';
import { Search } from '../search/Search';

import cartIconSrc from './cart.svg';

export const Topbar = React.memo(() => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-screen bg-green-300">
      <div className="container mx-auto py-4 md:py-3 flex md:flex-row flex-col justify-between items-center font-sans">
        <Link href="/">
          <a className="font-bold">Sklep TypeOfWeb</a>
        </Link>
        <div className="flex flex-wrap w-full md:w-auto">
          <div className="flex justify-between w-full  md:w-auto">
            <button
              onClick={toggleMobileMenu}
              className="block md:hidden ml-2 sm:ml-0 p-2 flex justify-center items-center font-bold"
            >
              <svg className="block w-5 h-5 mr-2" viewBox="0 0 32 32">
                <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z" />
              </svg>
              Menu
            </button>
            <Link href="/koszyk">
              <a className="font-bold flex items-center mr-4 md:mr-6">
                <img src={cartIconSrc} alt="Koszyk" className="block w-5 h-5 mr-3" />
                Koszyk
              </a>
            </Link>
          </div>
          <div className="mx-4 sm:mx-0 w-full md:w-auto">
            <Menu type="mobile" isMobileMenuOpen={isMobileMenuOpen} />
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
});

Topbar.displayName = 'Topbar';
