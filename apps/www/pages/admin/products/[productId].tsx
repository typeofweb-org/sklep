import { Content, Column, Loading, Button, InlineNotification } from 'carbon-components-react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useQuery, useMutation } from 'react-query';

import { Header } from '../../../components/admin/Header';
import styles from '../../../components/admin/loginForm/LoginForm.module.scss';
import { ProductsForm, ProductType } from '../../../components/admin/productsForm/ProductsForm';
import { fetcher } from '../../../utils/fetcher';

const updateProduct = (productId: number) => async (body: ProductType) =>
  fetcher('/products/{productId}', 'PUT', { body, params: { productId } });

const deleteProduct = async (productId: number) =>
  fetcher('/products/{productId}', 'DELETE', { params: { productId } });

const getProductData = async (productId: number): Promise<ProductType> => {
  // Should be GET /products/productsId
  const { data } = await fetcher('/products', 'GET', {});
  return data.find(({ id }) => id === productId) as ProductType;
};

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  const { data, isLoading } = useQuery('product', () => getProductData(+productId));
  const [mutate, { isLoading: isDeletionLoading, isSuccess, isError }] = useMutation(deleteProduct);
  const handleDelete = () => mutate(+productId);

  return (
    <>
      <Head>
        <title>{data ? data.name : 'Loading ...'}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/carbon-components@10.18.0/css/carbon-components.min.css"
        />
      </Head>
      <Header />
      <Content className={styles.contentWraper}>
        <Column lg={{ offset: 3 }} style={{ margin: '0 auto' }}>
          <h1>Podstrona produktu</h1>
          {data && (
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
              <ProductsForm isEditing initialValues={data} mutation={updateProduct(+productId)} />
            </>
          )}
        </Column>
      </Content>
      {isLoading || (isDeletionLoading && <Loading />)}
    </>
  );
}
