import type { SklepTypes } from '@sklep/types';

import { formatCurrency } from '../../../utils/currency';
import { TRANSLATED_STATUS_ORDERS } from '../orderForm/OrderStatusSelect';

import { ORDER_FIELDS } from './constants';

export type Order = SklepTypes['getOrders200Response']['data'][number];

export const headers = [
  ...ORDER_FIELDS.map(({ name, label }) => {
    return {
      key: name,
      header: label,
    };
  }),
  { key: 'actions', header: 'Actions' },
];
export type OrdersTableHeader = typeof headers[number];

export const getRows = (orders: readonly Order[]) => {
  return orders.map((order) => {
    return {
      ...order,
      total: formatCurrency(order.total / 100),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      status: TRANSLATED_STATUS_ORDERS[order.status],
      isSelected: undefined,
      isExpanded: undefined,
      disabled: undefined,
    };
  });
};
export type OrdersTableRow = ReturnType<typeof getRows>[number];
