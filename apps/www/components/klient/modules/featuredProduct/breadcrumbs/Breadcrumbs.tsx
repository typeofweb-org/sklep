import Link from 'next/link';
import React from 'react';

import styles from './Breadcrumbs.module.css';

type BreadcrumbsProps = {
  readonly productName: string;
};

const LinkWrapper = React.memo<{ readonly title: string; readonly href: string }>(
  ({ title, href }) => (
    <Link href={href}>
      <a className={styles.breadcrumb}>{title}</a>
    </Link>
  ),
);

LinkWrapper.displayName = 'LinkWrapper';

export const Breadcrumbs = React.memo<BreadcrumbsProps>(({ productName }) => {
  return (
    <nav className="py-8">
      <LinkWrapper href="/" title="Sklep TypeOfWeb" />
      <LinkWrapper href="/produkty" title="Produkty" />
      <span className="text-sm text-gray-600">{productName}</span>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
