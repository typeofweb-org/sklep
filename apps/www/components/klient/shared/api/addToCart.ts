import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../../../../utils/fetcher';

type Cart = SklepTypes['postCart200Response']['data'];

export function addToCart(body: {
  readonly productId: number;
  readonly quantity: number;
}): Promise<Cart> {
  return fetcher('/cart/add', 'PATCH', { body });
}
