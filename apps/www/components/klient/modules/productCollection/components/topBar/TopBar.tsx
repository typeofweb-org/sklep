import clsx from 'clsx';
import React, { useState } from 'react';

import { SearchIcon } from '../../../../shared/components/icons/SearchIcon';

type TopBarProps = {
  readonly handleSetInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TopBar = React.memo<TopBarProps>(({ handleSetInputValue }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleSearchVisible() {
    setIsSearchVisible((prevState) => !prevState);
  }

  const searchStylesDesktop = clsx(
    'block mr-2 mt-10 sm:mt-0 p-1 w-full sm:w-auto absolute left-0 sm:static border border-gray-600 rounded-md shadow-sd ',
    isSearchVisible && 'hidden',
  );

  return (
    <div className="w-full mb-10 sm:mb-4 px-4">
      <div className="container py-3 relative flex flex-wrap justify-between items-center sm:items-start">
        <h2 className="mb-3 sm:mb-0 uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
          Produkty
        </h2>
        <div className="w-auto h-8 sm:column flex flex-row-reverse">
          <button
            aria-expanded={isSearchVisible}
            onClick={handleSearchVisible}
            className="p-1 no-underline text-gray-600 hover:text-black"
          >
            <span className="sr-only">Otwórz/zamknij wyszukiwarkę</span>
            <SearchIcon />
          </button>
          <label className="sr-only" htmlFor="search">
            Znajdź produkt:
          </label>
          <input
            type="text"
            id="search"
            className={searchStylesDesktop}
            placeholder="Szukaj"
            onChange={handleSetInputValue}
          />
        </div>
      </div>
    </div>
  );
});
TopBar.displayName = 'TopBar';
