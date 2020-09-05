import React from 'react';

import seachIconSrc from './search.svg';

export const Search = React.memo(() => {
  return (
    <div className="w-full md:w-auto md:min-w-16 bg-white flex items-center px-2 py-2">
      <img src={seachIconSrc} alt="Szukaj" className="block w-5 h-5 mr-2" />
      <input className="font-sans" name="search" placeholder="Szukaj" />
    </div>
  );
});
Search.displayName = 'Search';
