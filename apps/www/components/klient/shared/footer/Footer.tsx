import Link from 'next/Link';
import React from 'react';

const FooterItem = React.memo(({ children }) => (
  <div className="w-full mb-4 lg:mb-0 text-center lg:text-left lg:w-1/5 px-3 md:px-0">
    {children}
  </div>
));

const FooterItemHeading = React.memo(({ children }) => (
  <h3 className="text-center lg:text-left font-bold text-gray-900 mb-4">{children}</h3>
));

export const Footer = React.memo(() => (
  <footer className="w-full bg-white py-16 border-t border-gray-400">
    <div className="container mx-auto flex px-6 mb-4 flex flex-wrap justify-between">
      <FooterItem>
        <FooterItemHeading>Najnowsze Newsy</FooterItemHeading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus
          commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
        </p>
      </FooterItem>
      <FooterItem>
        <FooterItemHeading>Linki</FooterItemHeading>
        <Link href="/">
          <a>Strona głowna</a>
        </Link>
      </FooterItem>
      <FooterItem>
        <FooterItemHeading>Śledź nas</FooterItemHeading>
      </FooterItem>
      <FooterItem>
        <FooterItemHeading>Newsletter</FooterItemHeading>
      </FooterItem>
    </div>
    <p className="text-center">Copyright © 2020 Sklep TypeOfWeb</p>
  </footer>
));
