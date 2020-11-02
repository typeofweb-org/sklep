import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

export const updateProduct = (
  productId: number,
  body: SklepTypes['putProductsProductIdRequestBody'],
) => {
  return fetcher('/products/{productId}', 'PUT', {
    params: { productId },
    body: {
      ...body,
      regularPrice: body.regularPrice,
      discountPrice: body.discountPrice ? body.discountPrice : null,
    },
  });
};
