import type { SklepTypes } from '@sklep/types';
import { Button } from 'carbon-components-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

import styles from '../../../styles/components/AdminSingleProduct.module.scss';
import { deleteProduct } from '../../../utils/api/deleteProduct';
import { useGetProductById } from '../../../utils/api/queryHooks';
import { updateProduct } from '../../../utils/api/updateProduct';
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
    refetchOnReconnect: false,
  });

  const [mutate, { status: deletionStatus, reset: resetDeletionStatus }] = useMutation(
    deleteProduct,
    {
      onSuccess() {
        addToast({
          kind: 'success',
          title: 'Operacja udana',
          caption: 'Produkt został usunięty pomyślnie',
        });
        closeDeletionModal();
        resetDeletionStatus();
        void router.replace('/admin/products');
      },
      onError(error?: Error) {
        const message = 'Nie udało się usunąć produktu';
        const caption = error ? `${message}: ${error.message}` : `${message}.`;
        addToast({
          kind: 'error',
          title: 'Wystąpił błąd',
          caption,
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

  const [showDeletionModal, setShowDeletionModal] = React.useState(false);
  const handleDeleteProduct = React.useCallback(() => {
    setShowDeletionModal(true);
  }, []);
  const closeDeletionModal = React.useCallback(() => setShowDeletionModal(false), []);

  if (!productId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{'Edytuj produkt ' + (latestProductResponse?.data.name ?? '')}</title>
      </Head>
      <h1 className={styles.heading}>Edytuj produkt</h1>
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
        handleDelete={mutate}
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
  return {
    name: response.data.name,
    description: response.data.description,
    isPublic: response.data.isPublic,
    regularPrice: response.data.regularPrice,
    discountPrice: response.data.discountPrice,
    type: response.data.type,
  };
}
