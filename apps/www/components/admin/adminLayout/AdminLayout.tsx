import { Column } from 'carbon-components-react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../Header';
import { Auth } from '../auth/Auth';
import { ContentWrapper } from '../contentWrapper/ContentWrapper';

type AdminLayoutProps = {
  readonly allowUnauthorized?: boolean;
  readonly hideHud?: boolean;
  readonly children?: React.ReactChild;
};

export const AdminLayout = React.memo<AdminLayoutProps>(
  ({ children, allowUnauthorized = false, hideHud = false }) => {
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
          />
        </Head>
        <Auth allowUnauthorized={allowUnauthorized}>
          {!hideHud && <Header />}
          <ContentWrapper>
            <Column lg={{ offset: 3 }}>{children}</Column>
          </ContentWrapper>
        </Auth>
      </>
    );
  },
);
AdminLayout.displayName = 'AdminLayout';
