import Link from 'next/Link';
import React from 'react';

export const Footer = React.memo(() => (
  <footer className="w-full bg-white py-16 border-t border-gray-400">
    <div className="container mx-auto flex px-6 mb-4 flex flex-wrap justify-between">
      <div className="w-full lg:w-1/5 px-3 md:px-0">
        <h3 className="font-bold text-gray-900 mb-4">Najnowsze Newsy</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus
          commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
        </p>
      </div>
      <div className="w-full lg:w-1/5 px-3 md:px-0">
        <h3 className="font-bold text-gray-900 mb-4">Linki</h3>
        <Link href="/">
          <a>Strona głowna</a>
        </Link>
      </div>
      <div className="w-full lg:w-1/5 px-3 md:px-0">
        <h3 className="font-bold text-gray-900 mb-4">Śledź nas</h3>
      </div>
      <div className="w-full lg:w-1/5 px-3 md:px-0">
        <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
      </div>
    </div>
    <p className="text-center">Copyright © 2020 Sklep TypeOfWeb</p>
  </footer>
));
