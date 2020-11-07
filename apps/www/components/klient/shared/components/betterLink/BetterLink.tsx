import type { LinkProps } from 'next/link';
import Link from 'next/link';
import React from 'react';

import styles from './betterLink.module.css';

type BetterLinkProps = React.PropsWithChildren<LinkProps> & { readonly disabled?: boolean };

export const BetterLink = ({ disabled, children, ...props }: BetterLinkProps) => {
  if (disabled) {
    return <span className={styles.disabled}>{children}</span>;
  }
  return <Link {...props}>{children}</Link>;
};
BetterLink.displayName = 'BetterLink';
