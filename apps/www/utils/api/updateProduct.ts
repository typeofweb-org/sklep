import { SklepTypes } from '@sklep/types';
import { fetcher } from '../fetcher';

export const updateProduct = (
  productId: number,
  body: SklepTypes['putProductsProductIdRequestBody'],
) => {
  return fetcher('/products/{productId}', 'PUT', { params: { productId }, body });
};
