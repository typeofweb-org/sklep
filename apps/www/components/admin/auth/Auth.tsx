import { useRouter } from 'next/router';
import React from 'react';

import { useToWQuery } from '../../../utils/fetcher';

type AuthProps = {
  readonly children: React.ReactNode;
  readonly allowUnauthorized: boolean;
};

export const useAuth = () => useToWQuery(['/auth/me', 'GET', {}]);

export const Auth = React.memo<AuthProps>(({ children, allowUnauthorized }) => {
  const { resolvedData, isLoading } = useAuth();

  const router = useRouter();

  if (allowUnauthorized) {
    return <>{children}</>;
  }

  if (isLoading) {
    return null;
  }

  if (!resolvedData?.data || resolvedData.data.user.role !== 'ADMIN') {
    void router.replace('/admin/login');
    return null;
  }

  return <>{children}</>;
});
Auth.displayName = 'Auth';
