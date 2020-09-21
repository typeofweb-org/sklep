import React from 'react';

import { useToWQuery } from '../../../utils/fetcher';

type AuthProps = { readonly children: React.ReactNode };
export const Auth = React.memo<AuthProps>(({ children }) => {
  const { resolvedData } = useToWQuery(['/auth/me', 'GET', {}]);
  if (resolvedData) {
    return <>{children}</>;
  }
  return null;
});
Auth.displayName = 'Auth';
