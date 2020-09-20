import React from 'react';

import { useToWQuery } from '../../../utils/fetcher';

type AuthProps = { readonly children: React.ReactNode };
export const Auth = React.memo<AuthProps>(({ children }) => {
  const { data } = useToWQuery(['/auth/me', 'GET', {}]);
  if (data) {
    return <>{children}</>;
  }
  return null;
});
Auth.displayName = 'Auth';
