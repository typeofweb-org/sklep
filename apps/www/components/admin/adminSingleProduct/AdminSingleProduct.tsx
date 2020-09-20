import type { SklepTypes } from '@sklep/types';
import { Button } from 'carbon-components-react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import styles from '../../../styles/components/AdminSingleProduct.module.scss';
import { useGetProductById } from '../../../utils/api/queryHooks';
import { updateProduct } from '../../../utils/api/updateProduct';
import { fetcher } from '../../../utils/fetcher';
import { DeleteProductConfirmationModal } from '../deleteProductConfirmationModal/DeleteProductConfirmationModal';
import { ProductsForm } from '../productsForm/ProductsForm';
import { ProductsFormSkeleton } from '../productsForm/ProductsFormSkeleton';
import { useToasts } from '../toasts/Toasts';

export const AdminSingleProduct = React.memo(() => {
  const { addToast } = useToasts();
  const router = useRouter();
  const productId = Number(router.query.productId);

  const { latestData: latestProductResponse, isLoading, isError } = useGetProductById(productId, {
    enabled: Boolean(productId),
  });

  const cache = useQueryCache();
  const [deleteProduct, { status: deletionStatus, reset: resetDeletionStatus }] = useMutation(
    (productId: number) => fetcher('/products/{productId}', 'DELETE', { params: { productId } }),
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
        router.push('/admin/products');
      },
      onError(error?: Error) {
        addToast({
          kind: 'error',
          title: 'Wystąpił błąd',
          caption: `Nie udało się usunąć produktu: ${error?.message}`,
        });
      },
    },
  );

  const memoizedUpdateProduct = React.useCallback(
    (body: SklepTypes['putProductsProductIdRequestBody']) => {
      return updateProduct(productId, body);
    },
    [productId],
  );
  const handleDeleteProduct = React.useCallback(() => {
    setShowDeletionModal(true);
  }, []);

  const [showDeletionModal, setShowDeletionModal] = React.useState(false);
  const closeDeletionModal = React.useCallback(() => setShowDeletionModal(false), []);

  if (!productId) {
    return null;
  }

  return (
    <>
      <h1 className={styles.heading}>Podstrona produktu</h1>
      {latestProductResponse && (
        <>
          <ProductsForm
            mode="EDITING"
            initialValues={getInitialValues(latestProductResponse)}
            mutation={memoizedUpdateProduct}
          />
          <Button className={styles.deleteButton} kind="danger" onClick={handleDeleteProduct}>
            Usuń produkt
          </Button>
        </>
      )}
      <DeleteProductConfirmationModal
        isOpen={showDeletionModal}
        product={latestProductResponse?.data}
        handleDelete={deleteProduct}
        handleClose={closeDeletionModal}
        status={deletionStatus}
      />
      {isLoading && <ProductsFormSkeleton />}
      {isError && (
        <span className={styles.errorMessage}>
          Wystąpił błąd podczas pobierania danych produktu
        </span>
      )}
    </>
  );
});
AdminSingleProduct.displayName = 'AdminSingleProduct';

function getInitialValues(
  response: SklepTypes['getProductsProductId200Response'],
): SklepTypes['postProductsRequestBody'] {
  const initialValues: SklepTypes['postProductsRequestBody'] = {
    name: response.data.name,
    description: response.data.description,
    isPublic: response.data.isPublic,
    regularPrice: response.data.regularPrice,
    discountPrice: response.data.discountPrice,
    type: response.data.type,
  };

  return initialValues;
}
