import { Delete16 } from '@carbon/icons-react';
import type { DataTableCustomRenderProps } from 'carbon-components-react';
import {
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  Button,
} from 'carbon-components-react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

import type { ProductsTableRow, ProductsTableHeader } from './ProductListUtils';

export const ProductsTableToolbar = React.memo<
  DataTableCustomRenderProps<ProductsTableRow, ProductsTableHeader>
>(({ getBatchActionProps }) => {
  const router = useRouter();
  const handleRedirectToAddProduct = React.useCallback(() => {
    router.push('/admin/add-product');
  }, [router]);
  const batchActionsProps = getBatchActionProps();

  return (
    <TableToolbar>
      <TableBatchActions {...batchActionsProps}>
        <TableBatchAction
          tabIndex={batchActionsProps.shouldShowBatchActions ? 0 : -1}
          renderIcon={Delete16}
          onClick={() => console.log('clicked')}
        >
          Usuń produkt(y)
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <Button
          tabIndex={batchActionsProps.shouldShowBatchActions ? -1 : 0}
          onClick={handleRedirectToAddProduct}
          size="small"
          kind="primary"
        >
          Dodaj nowy produkt
        </Button>
      </TableToolbarContent>
    </TableToolbar>
  );
});
ProductsTableToolbar.displayName = 'ProductsTableToolbar';
