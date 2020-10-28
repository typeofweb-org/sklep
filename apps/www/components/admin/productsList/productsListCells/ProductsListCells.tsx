import type { DenormalizedRow } from 'carbon-components-react';
import { TableCell } from 'carbon-components-react';
import React from 'react';

import { getCellValue } from '../../utils';
import { PRODUCT_FIELDS } from '../ProductFields';

type Props = {
  readonly row: DenormalizedRow;
};

export const ProductsListCells = React.memo<Props>(({ row }) => {
  return (
    <>
      {PRODUCT_FIELDS.map(({ name }) => (
        <TableCell key={name}>{getCellValue({ row, name })}</TableCell>
      ))}
    </>
  );
});
ProductsListCells.displayName = 'ProductListRow';
