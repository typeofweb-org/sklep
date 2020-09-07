import Link from 'next/link';
import React from 'react';

type BreadcrumbsProps = {
  productName: string;
};

const LinkWrapper = React.memo<{ title: string; href: string }>(({ title, href }) => (
  <Link href={href}>
    <a className="text-sm text-gray-900 hover:text-orange-600 transition duration-300 ease-in-out">
      {title}
    </a>
  </Link>
));

const delimiterClassName = 'px-2';

export const Breadcrumbs = React.memo<BreadcrumbsProps>(({ productName }) => {
  return (
    <nav className="py-8">
      <LinkWrapper href="/" title="Sklep TypeOfWeb" />
      <span className={delimiterClassName}>/</span>
      <LinkWrapper href="/produkty" title="Produkty" />
      <span className={delimiterClassName}>/</span>
      <span className="text-sm text-gray-600">{productName}</span>
    </nav>
  );
});
