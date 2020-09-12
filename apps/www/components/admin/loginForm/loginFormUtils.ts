import { fetcher } from '../../../utils/fetcher';

export const login = async (payload: LoginType) =>
  fetcher('http://api.sklep.localhost:3002/auth/login', 'POST', payload);
