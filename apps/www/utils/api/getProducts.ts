import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

type Products = SklepTypes['getProducts200Response']['data'];

export function getProducts(): Promise<Products> {
  return fetcher('/products', 'GET', {}).then(({ data }) => data);
}
