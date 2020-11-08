import type { SklepTypes } from '@sklep/types';

import { fetcher } from '../fetcher';

export const updateOrder = (orderId: string, body: SklepTypes['putOrdersOrderIdRequestBody']) => {
  return fetcher('/orders/{orderId}', 'PUT', { body, params: { orderId } });
};
