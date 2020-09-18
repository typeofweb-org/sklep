import { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

type Cart = SklepTypes['postCart200Response']['data'];

export function addToCart(body: { productId: number; quantity: number }): Promise<Cart> {
  return fetcher('/cart/add', 'PATCH', { body }).then(({ data }) => data);
}
