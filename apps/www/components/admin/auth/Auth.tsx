import React from 'react';

import { useToWQuery } from '../../../utils/fetcher';

type AuthProps = { readonly children: React.ReactNode };
export const Auth = React.memo<AuthProps>(({ children }) => {
  const { resolvedData } = useToWQuery(['/auth/me', 'GET', {}]);
  if (!resolvedData) {
    return null;
  }
  return <>{children}</>;
});
Auth.displayName = 'Auth';
