import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

export const createProduct = async (body: SklepTypes['postProductsRequestBody']) => {
  return fetcher('/products', 'POST', { body });
};
