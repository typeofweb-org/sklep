import { TableRow, TableCell, DataTableRow } from 'carbon-components-react';
import React from 'react';

import { PRODUCT_FIELDS } from '../ProductFields';

type Props = {
  row: DataTableRow<string>;
};

export const ProductsListRow = React.memo<Props>(({ row }) => {
  const getCellContent = (row: DataTableRow<string>, key: string): string | number => {
    const value: string | number | boolean | null | undefined =
      row[key as keyof DataTableRow<string>];

    switch (typeof value) {
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'number':
        return value;
      case 'string':
        return value;
      default:
        return '-';
    }
  };

  return (
    <TableRow>
      {PRODUCT_FIELDS.map(({ key }) => (
        <TableCell key={key}>{getCellContent(row, key)}</TableCell>
      ))}
    </TableRow>
  );
});

ProductsListRow.displayName = 'ProductListRow';
