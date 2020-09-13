import { fetcher } from '../../../utils/fetcher';

import type { LoginType } from './LoginForm';

export const login = (payload: LoginType) =>
  fetcher(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, 'POST', payload);
