import type { SklepTypes } from '@sklep/types';
import { Loading, Button } from 'carbon-components-react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { AdminLayout } from '../../../components/admin/adminLayout/AdminLayout';
import { DeleteProductConfirmationModal } from '../../../components/admin/deleteProductConfirmationModal/DeleteProductConfirmationModal';

import { ProductsForm } from '../../../components/admin/productsForm/ProductsForm';
import { ToastsContextProvider, useToasts } from '../../../components/admin/toasts/Toasts';
import { useGetProductById } from '../../../utils/api/queryHooks';
import { updateProduct } from '../../../utils/api/updateProduct';
import { fetcher } from '../../../utils/fetcher';
import styles from '../../../styles/components/SingleProductPage.module.scss';

export default function SingleProductPageProvider() {
  return (
    <ToastsContextProvider>
      <SingleProductPage />
    </ToastsContextProvider>
  );
}

function SingleProductPage() {
  const { addToast } = useToasts();
  const router = useRouter();
  const productId = Number(router.query.productId);

  const { latestData: latestProductResponse, isLoading } = useGetProductById(productId, {
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
      },
      async onError(error?: Error) {
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
      <Head>
        <title>Panel admina, podstrona produktu</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <AdminLayout>
        <h1 className={styles.heading}>Podstrona produktu</h1>
        {latestProductResponse && (
          <>
            <Button className={styles.deleteButton} kind="danger" onClick={handleDeleteProduct}>
              Usuń produkt
            </Button>
            <ProductsForm
              mode="EDITING"
              initialValues={getInitialValues(latestProductResponse)}
              mutation={memoizedUpdateProduct}
            />
          </>
        )}
        <DeleteProductConfirmationModal
          isOpen={showDeletionModal}
          product={latestProductResponse?.data}
          handleDelete={deleteProduct}
          handleClose={closeDeletionModal}
          status={deletionStatus}
        />
        {isLoading && <Loading />}
      </AdminLayout>
    </>
  );
}

function getInitialValues(
  response: SklepTypes['getProductsProductId200Response'],
): SklepTypes['postProductsRequestBody'] {
  const initialValues: SklepTypes['postProductsRequestBody'] = {
    name: response.data.name,
    description: response.data.description,
    isPublic: response.data.isPublic,
    regularPrice: response.data.regularPrice,
    type: response.data.type,
  };
  initialValues.discountPrice = response.data.discountPrice;

  return initialValues;
}
