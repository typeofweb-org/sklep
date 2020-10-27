import type { DenormalizedRow } from 'carbon-components-react';
import React from 'react';

import type { OrdersTableRow } from './utils';

type Props = {
  readonly row: DenormalizedRow;
  readonly name: keyof OrdersTableRow;
};

export const OrdersListRowCellValue = React.memo<Props>(({ row, name }) => {
  const cell = row.cells.find((c) => c.info.header === name);
  switch (typeof cell?.value) {
    case 'boolean':
      return <>{cell?.value ? 'Yes' : 'No'}</>;
    case 'number':
    case 'string':
      return <>{cell?.value}</>;
    default:
      return <>-</>;
  }
});

OrdersListRowCellValue.displayName = 'OrdersListRowCellValue';
