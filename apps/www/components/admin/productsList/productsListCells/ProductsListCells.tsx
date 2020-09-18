import type { DenormalizedRow } from 'carbon-components-react';
import { TableCell } from 'carbon-components-react';
import React from 'react';

import { PRODUCT_FIELDS } from '../ProductFields';

import { ProductsListRowCellValue } from './productsListRowCellValue/ProductsListRowCellValue';

type Props = {
  readonly row: DenormalizedRow;
};

export const ProductsListCells = React.memo<Props>(({ row }) => {
  return (
    <>
      {PRODUCT_FIELDS.map(({ name }) => (
        <TableCell key={name}>
          <ProductsListRowCellValue name={name} row={row} />
        </TableCell>
      ))}
    </>
  );
});
ProductsListCells.displayName = 'ProductListRow';
