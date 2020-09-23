import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

export const createProduct = (body: SklepTypes['postProductsRequestBody']) => {
  return fetcher('/products', 'POST', { body });
};
