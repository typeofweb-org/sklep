import type { DenormalizedRow } from 'carbon-components-react';
import { TableCell } from 'carbon-components-react';
import React from 'react';

import { OrdersListRowCellValue } from './OrdersListCellValue';
import { ORDER_FIELDS } from './constants';

type Props = {
  readonly row: DenormalizedRow;
};

export const OrdersListCells = React.memo<Props>(({ row }) => {
  return (
    <>
      {ORDER_FIELDS.map(({ name }) => (
        <TableCell key={name}>
          <OrdersListRowCellValue name={name} row={row} />
        </TableCell>
      ))}
    </>
  );
});
OrdersListCells.displayName = 'OrdersListRow';
