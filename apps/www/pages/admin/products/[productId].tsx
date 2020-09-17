import type { SklepTypes } from '@sklep/types';
import { Content, Column, Loading, Button, InlineNotification } from 'carbon-components-react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useMutation } from 'react-query';

import { Header } from '../../../components/admin/Header';
import styles from '../../../components/admin/loginForm/LoginForm.module.scss';
import { ProductsForm } from '../../../components/admin/productsForm/ProductsForm';
import { deleteProduct } from '../../../utils/api/deleteProduct';
import { useGetProductById } from '../../../utils/api/queryHooks';
import { updateProduct } from '../../../utils/api/updateProduct';

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  const convertedProductId = Number(productId);
  const isConvertedProductId = !Number.isNaN(convertedProductId);

  const { data, isLoading } = useGetProductById(convertedProductId, {
    enabled: isConvertedProductId,
  });
  const [mutate, { isLoading: isDeletionLoading, isSuccess, isError }] = useMutation(deleteProduct);

  const memoizedUpdateProduct = React.useCallback(
    (body: SklepTypes['putProductsProductIdRequestBody']) => {
      return updateProduct(convertedProductId, body);
    },
    [convertedProductId],
  );

  const handleDelete = () => {
    mutate(convertedProductId);
  };

  return (
    <>
      <Head>
        <title>Panel admina, podstrona produktu</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Header />
      <Content className={styles.contentWraper}>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          <h1>Podstrona produktu</h1>
          {data && data.data && (
            <>
              <Button kind="danger" onClick={handleDelete}>
                Usuń produkt
              </Button>
              {isSuccess && (
                <InlineNotification title="Produkt został pomyślnie usunięty" kind="success" />
              )}
              {isError && (
                <InlineNotification title="Wystąpił błąd podczas usuwania produktu" kind="error" />
              )}
              <ProductsForm
                mode="Edition"
                initialValues={getInitialValues(data.data)}
                mutation={memoizedUpdateProduct}
              />
            </>
          )}
        </Column>
      </Content>
      {(isLoading || isDeletionLoading) && <Loading />}
    </>
  );
}

// To change
function getInitialValues(res: SklepTypes['Model1']): SklepTypes['postProductsRequestBody'] {
  // To do
  return {} as any;
}
