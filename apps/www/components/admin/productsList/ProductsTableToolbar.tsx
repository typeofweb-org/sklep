import { Delete16 } from '@carbon/icons-react';
import type { DataTableCustomRenderProps } from 'carbon-components-react';
import {
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  Button,
} from 'carbon-components-react';
import React from 'react';

import type { ProductsTableRow, ProductsTableHeader } from './ProductListUtils';

export const ProductsTableToolbar = React.memo<
  DataTableCustomRenderProps<ProductsTableRow, ProductsTableHeader>
>(({ getBatchActionProps }) => {
  return (
    <TableToolbar>
      <TableBatchActions {...getBatchActionProps()}>
        <TableBatchAction
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={Delete16}
          onClick={() => console.log('clicked')}
        >
          Delete
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <Button
          tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
          onClick={() => console.log('clicked')}
          size="small"
          kind="primary"
        >
          Add new
        </Button>
      </TableToolbarContent>
    </TableToolbar>
  );
});
ProductsTableToolbar.displayName = 'ProductsTableToolbar';
