import { Column } from 'carbon-components-react';
import React from 'react';

import { Header } from '../Header';
import { ContentWrapper } from '../contentWrapper/ContentWrapper';

type AdminLayoutProps = { readonly children: React.ReactNode };
export const AdminLayout = React.memo<AdminLayoutProps>(({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Column lg={{ offset: 3 }}>{children}</Column>
      </ContentWrapper>
    </>
  );
});
AdminLayout.displayName = 'AdminLayout';
