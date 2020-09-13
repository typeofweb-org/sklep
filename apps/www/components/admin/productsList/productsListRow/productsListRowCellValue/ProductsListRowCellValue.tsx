import { DataTableRow } from 'carbon-components-react';
import React from 'react';

type Props = {
  key: string;
  row: DataTableRow<string>;
};

export const ProductsListRowCellValue = React.memo<Props>(({ key, row }) => {
  const value = row[key as keyof DataTableRow];

  switch (typeof value) {
    case 'boolean':
      return <>{value ? 'Yes' : 'No'}</>;
    case 'number':
    case 'string':
      return <>{value}</>;
    default:
      return <>-</>;
  }
});

ProductsListRowCellValue.displayName = 'ProductsListRowCellValue';
