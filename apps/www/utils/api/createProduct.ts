import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

export const createProduct = (body: SklepTypes['postProductsRequestBody']) => {
  return fetcher('/products', 'POST', {
    body: {
      ...body,
      regularPrice: body.regularPrice * 100,
      discountPrice: body.discountPrice ? body.discountPrice * 100 : null,
    },
  });
};
