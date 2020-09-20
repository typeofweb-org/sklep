import clsx from 'clsx';
import React, { useState } from 'react';

import { SearchIcon } from '../../../../shared/components/icons/SearchIcon';

export const TopBar = React.memo(() => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleSearchVisible() {
    setIsSearchVisible((prevState) => !prevState);
  }

  const searchStylesDesktop = clsx(
    'hidden md:block w-0',
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd mr-2 w-auto px-2 h-8 ml-4',
  );

  const searchStylesMobile = clsx(
    'md:hidden h-0 w-full',
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd h-10 mx-6 px-2',
  );

  return (
    <>
      <div className="w-full z-30 top-0 px-6 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
          <h2 className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
            STORE
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              className={searchStylesDesktop}
              placeholder="Search"
              aria-label="Search"
            />
            <button
              aria-label="Search"
              onClick={handleSearchVisible}
              className="pl-3 inline-block no-underline text-gray-600 hover:text-black"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
      <input type="text" id="searchInput" className={searchStylesMobile} placeholder="Search" />
    </>
  );
});
TopBar.displayName = 'TopBar';
