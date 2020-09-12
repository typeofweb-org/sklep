import { TableRow, DataTableRow, TableCell } from 'carbon-components-react';
import React from 'react';

import { PRODUCT_FIELDS } from '../ProductFields';

import { ProductsListRowCellValue } from './productsListRowCellValue/ProductsListRowCellValue';

type Props = {
  row: DataTableRow<string>;
};

export const ProductsListRow = React.memo<Props>(({ row }) => {
  return (
    <TableRow>
      {PRODUCT_FIELDS.map(({ key }) => (
        <TableCell key={key}>
          <ProductsListRowCellValue value={row[key as keyof DataTableRow]} />
        </TableCell>
      ))}
    </TableRow>
  );
});

ProductsListRow.displayName = 'ProductListRow';
