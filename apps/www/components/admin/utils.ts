import type { DenormalizedRow } from 'carbon-components-react';

import type { OrdersTableRow } from './ordersList/utils';

export const getCellValue = ({
  row,
  name,
}: {
  readonly row: DenormalizedRow;
  readonly name: keyof OrdersTableRow;
}) => {
  const cell = row.cells.find((c) => c.info.header === name);
  switch (typeof cell?.value) {
    case 'boolean':
      return cell?.value ? 'Yes' : 'No';
    case 'number':
    case 'string':
      return cell?.value;
    default:
      return '-';
  }
};
