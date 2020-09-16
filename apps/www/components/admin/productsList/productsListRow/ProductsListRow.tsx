import type { DataTableRow } from 'carbon-components-react';
import { TableRow, TableCell } from 'carbon-components-react';
import React from 'react';

import { PRODUCT_FIELDS } from '../ProductFields';

import { ProductsListRowCellValue } from './productsListRowCellValue/ProductsListRowCellValue';

type Props = {
  readonly row: DataTableRow<string>;
};

export const ProductsListRow = React.memo<Props>(({ row }) => {
  return (
    <TableRow>
      {PRODUCT_FIELDS.map(({ key }) => (
        <TableCell key={key}>
          <ProductsListRowCellValue key={key} row={row} />
        </TableCell>
      ))}
    </TableRow>
  );
});

ProductsListRow.displayName = 'ProductListRow';
