import clsx from 'clsx';
import React from 'react';

import styles from './Container.module.scss';

type ContainerProps = {
  className?: string;
  as?: 'div' | 'main' | 'section' | 'article' | 'footer' | 'header';
  children: React.ReactNode;
};
export default function Container({ children, className, as: As = 'div' }: ContainerProps) {
  return <As className={clsx(styles.container, className)}>{children}</As>;
}
