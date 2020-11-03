import type { DenormalizedRow } from 'carbon-components-react';
import { TableCell } from 'carbon-components-react';
import React from 'react';

import { getCellValue } from '../utils';

import { ORDER_FIELDS } from './constants';

type OrdersListCellsProps = {
  readonly row: DenormalizedRow;
};

export const OrdersListCells = React.memo<OrdersListCellsProps>(({ row }) => {
  return (
    <>
      {ORDER_FIELDS.map(({ name }) => (
        <TableCell key={name}>{getCellValue({ row, name })}</TableCell>
      ))}
    </>
  );
});
OrdersListCells.displayName = 'OrdersListRow';
