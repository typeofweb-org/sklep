import { Delete16 } from '@carbon/icons-react';
import type { DataTableCustomRenderProps } from 'carbon-components-react';
import {
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  Button,
} from 'carbon-components-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { deleteProducts } from '../../../utils/api/deleteProducts';
import { useToasts } from '../toasts/Toasts';

import type { ProductsTableRow, ProductsTableHeader } from './ProductListUtils';

export const ProductsTableToolbar = React.memo<
  DataTableCustomRenderProps<ProductsTableRow, ProductsTableHeader>
>(({ getBatchActionProps, selectedRows }) => {
  const router = useRouter();
  const cache = useQueryCache();
  const { addToast } = useToasts();
  const [mutate] = useMutation(deleteProducts, {
    async onSuccess(settledPromises: readonly PromiseSettledResult<never>[]) {
      const totalNumberOfPromises = settledPromises.length;
      const resolvedPromises = settledPromises.filter(({ status }) => status === 'fulfilled')
        .length;
      await cache.refetchQueries('/products');
      if (resolvedPromises === totalNumberOfPromises) {
        return addToast({
          kind: 'success',
          title: 'Operacja udana',
          caption: 'Wszystkie produkty zostały usunięte pomyślnie',
        });
      }
      addToast({
        kind: 'warning',
        title: 'Coś poszło nie tak',
        caption: `Udało się usunąć ${resolvedPromises} z ${totalNumberOfPromises} przedmiotów`,
      });
    },
  });
  const handleRedirectToAddProduct = React.useCallback(() => {
    void router.push('/admin/add-product');
  }, [router]);

  const handleDeleteProducts = React.useCallback(() => {
    const productsIdsArray = selectedRows.map(({ id }) => Number(id));
    void mutate(productsIdsArray);
  }, [mutate, selectedRows]);
  const batchActionsProps = getBatchActionProps();

  return (
    <TableToolbar>
      <TableBatchActions {...batchActionsProps}>
        <TableBatchAction
          tabIndex={batchActionsProps.shouldShowBatchActions ? 0 : -1}
          renderIcon={Delete16}
          onClick={handleDeleteProducts}
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
