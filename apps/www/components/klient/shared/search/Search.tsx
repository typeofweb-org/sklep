import React from 'react';

export const Search = React.memo(() => {
  return (
    <div className="w-full md:w-auto md:min-w-16 bg-white flex items-center px-2 py-2">
      <svg className="block w-5 h-5 mr-2" viewBox="0 0 32 32">
        <path
          d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787
                0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515
                0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418
                0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
        />
      </svg>
      <input className="focus:outline-none font-sans" name="search" placeholder="Szukaj" />
    </div>
  );
});
Search.displayName = 'Search';
