import { DataTableRow } from 'carbon-components-react';
import React from 'react';

type Props = {
  key: string;
  row: DataTableRow<string>;
};

export const ProductsListRowCellValue = React.memo<Props>(({ key, row }) => {
  const value = row[key as keyof DataTableRow];

  let formattedValue: string | number = '-';

  switch (typeof value) {
    case 'boolean':
      formattedValue = value ? 'Yes' : 'No';
      break;
    case 'number':
    case 'string':
      formattedValue = value;
  }

  return <>{formattedValue}</>;
});

ProductsListRowCellValue.displayName = 'ProductsListRowCellValue';
