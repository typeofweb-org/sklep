import { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

type Products = SklepTypes['getProducts200Response']['data'];

export function getProducts(): Promise<Products> {
  return fetcher<Products>('http://api.sklep.localhost:3002/products');
}
