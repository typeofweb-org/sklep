import Link from 'next/link';
import React from 'react';

type BreadcrumbsProps = {
  productName: string;
};

const LinkWrapper = React.memo<{ title: string; href: string }>(({ title, href }) => (
  <Link href={href}>
    <a className="breadcrumb">{title}</a>
  </Link>
));

export const Breadcrumbs = React.memo<BreadcrumbsProps>(({ productName }) => {
  return (
    <nav className="py-8">
      <LinkWrapper href="/" title="Sklep TypeOfWeb" />
      <LinkWrapper href="/produkty" title="Produkty" />
      <span className="text-sm text-gray-600">{productName}</span>
    </nav>
  );
});
