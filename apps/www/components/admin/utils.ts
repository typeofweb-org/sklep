import type { DenormalizedRow } from 'carbon-components-react';

import { formatCurrency } from '../../utils/currency';

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
      if (cell.info.header === 'discountPrice' || cell.info.header === 'regularPrice') {
        return formatCurrency(cell?.value / 100);
      }
      return cell?.value;
    case 'string':
      return cell?.value;
    default:
      return '-';
  }
};
