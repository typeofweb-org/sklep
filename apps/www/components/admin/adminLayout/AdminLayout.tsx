import { Column, Content } from 'carbon-components-react';
import React from 'react';

import { Header } from '../Header';

import styles from './AdminLayout.module.scss';

type AdminLayoutProps = { readonly content: React.ReactNode };
export const AdminLayout = React.memo<AdminLayoutProps>(({ content }) => {
  return (
    <>
      <Header />
      <Content className={styles.contentWraper}>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          {content}
        </Column>
      </Content>
    </>
  );
});
AdminLayout.displayName = 'AdminLayout';
