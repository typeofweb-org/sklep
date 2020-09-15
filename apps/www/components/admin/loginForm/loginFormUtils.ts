import { fetcher } from '../../../utils/fetcher';

import type { LoginType } from './LoginForm';

export const login = (body: LoginType) => fetcher('/auth/login', 'POST', { body });
