import type { SklepTypes } from '@sklep/types';
import type { DenormalizedRow } from 'carbon-components-react';

import { formatCurrency } from '../../utils/currency';

import { normalizeOrderStatus } from './orderForm/OrderStatusSelect';

export const getCellValue = <T extends string>({
  row,
  name,
}: {
  readonly row: DenormalizedRow;
  readonly name: T;
}) => {
  const cell = row.cells.find((c) => c.info.header === name);
  switch (typeof cell?.value) {
    case 'boolean':
      return cell?.value ? 'Yes' : 'No';
    case 'number':
      if (
        cell.info.header === 'discountPrice' ||
        cell.info.header === 'regularPrice' ||
        cell.info.header === 'total'
      ) {
        return formatCurrency(cell?.value / 100);
      }
      return cell?.value;
    case 'string':
      if (cell.info.header === 'status') {
        return normalizeOrderStatus(
          cell?.value as SklepTypes['getOrdersStatuses200Response']['data'][number],
        );
      }
      return cell?.value;
    default:
      return '-';
  }
};
