import type { Nil } from '@sklep/types';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { deleteProduct } from '../../../utils/api/deleteProduct';
import { useGetProducts } from '../../../utils/api/queryHooks';
import { DeleteProductConfirmationModal } from '../deleteProductConfirmationModal/DeleteProductConfirmationModal';
import type { Product } from '../productsList/ProductListUtils';
import { ProductsList } from '../productsList/ProductsList';
import { useToasts } from '../toasts/Toasts';

export const AdminProducts = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const { data, isLoading } = useGetProducts({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  const { addToast } = useToasts();
  const cache = useQueryCache();

  const [mutate, { status: deletionStatus, reset: resetDeletionStatus }] = useMutation(
    deleteProduct,
    {
      async onSuccess() {
        addToast({
          kind: 'success',
          title: 'Operacja udana',
          caption: 'Produkt został usunięty pomyślnie',
        });
        await cache.refetchQueries('/products');
        closeDeletionModal();
        resetDeletionStatus();
      },
      onError(error?: Error) {
        const message = 'Nie udało się usunąć produktu';
        addToast({
          kind: 'error',
          title: 'Wystąpił błąd',
          caption: error?.message ? `${message}: ${error.message}` : message,
        });
      },
    },
  );

  const handlePageChange = React.useCallback(
    (data: { readonly page: number; readonly pageSize: number }) => {
      setPage(data.page);
      setPageSize(data.pageSize);
    },
    [],
  );

  const handleDeleteProduct = React.useCallback((product: Product) => {
    setProductForDeletion(product);
    setShowDeletionModal(true);
  }, []);

  // we need 2 states to avoid flash of "UNDEFINED" in the modal
  const [showDeletionModal, setShowDeletionModal] = React.useState(false);
  const [productForDeletion, setProductForDeletion] = React.useState<Nil<Product>>(null);

  const closeDeletionModal = React.useCallback(() => setShowDeletionModal(false), []);

  return (
    <>
      <ProductsList
        products={data?.data ?? []}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        changePage={handlePageChange}
        deleteProduct={handleDeleteProduct}
        productsCount={data?.meta.total ?? 0}
      />

      <DeleteProductConfirmationModal
        isOpen={showDeletionModal}
        product={productForDeletion}
        handleDelete={mutate}
        handleClose={closeDeletionModal}
        status={deletionStatus}
      />
    </>
  );
});
