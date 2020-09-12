import React, { useState, useEffect } from 'react';

type Props = {
  value: string | number | boolean | null | undefined;
};

export const ProductsListRowCellValue = React.memo<Props>(({ value }) => {
  const [displayedValue, setDisplayedValue] = useState<string | number>('-');

  useEffect(() => {
    switch (typeof value) {
      case 'boolean':
        setDisplayedValue(value ? 'Yes' : 'No');
        break;
      case 'number':
      case 'string':
        setDisplayedValue(value);
        break;
      default:
        break;
    }
  }, [value]);

  return <>{displayedValue}</>;
});

ProductsListRowCellValue.displayName = 'ProductsListRowCellValue';
