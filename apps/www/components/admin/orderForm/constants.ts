import type { SklepTypes } from '@sklep/types';

export const ORDER_STATUSES: readonly SklepTypes['putOrdersOrderIdRequestBody']['status'][] = [
  'PENDING',
  'PROCESSING',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
  'REFUNDED',
  'FAILED',
];
