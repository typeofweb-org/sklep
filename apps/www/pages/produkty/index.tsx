import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { Hero } from '../../components/klient/modules/hero/Hero';
import { ProductCollection } from '../../components/klient/modules/productCollection/ProductCollection';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useGetProducts } from '../../utils/api/queryHooks';

function ProductsPage() {
  const { data: productsResponse } = useGetProducts();

  if (!productsResponse?.data.length) {
    return (
      <Layout title="Sklep strona główna">
        <Hero />
        Brak produktów.
      </Layout>
    );
  }

  return (
    <Layout title="Produkty">
      <Hero />
      <ProductCollection products={productsResponse.data} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await useGetProducts.prefetch(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default ProductsPage;
