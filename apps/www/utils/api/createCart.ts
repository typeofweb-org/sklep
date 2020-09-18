import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

type Cart = SklepTypes['postCart200Response']['data'];

export function createCart(): Promise<Cart> {
  return fetcher('/cart', 'POST', {}).then(({ data }) => data);
}
