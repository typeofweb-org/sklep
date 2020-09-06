import React from 'react';

import styles from './Container.module.scss';

type ContainerProps = {
  className?: string;
  as?: 'div' | 'main' | 'section' | 'article' | 'footer' | 'header';
  children: React.ReactNode;
};

export const Container = React.memo<ContainerProps>(
  ({ children, className = '', as: Element = 'div' }) => {
    return <Element className={`${styles.container} ${className}`}>{children}</Element>;
  },
);
Container.displayName = 'Container';
