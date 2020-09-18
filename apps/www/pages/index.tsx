import React from 'react';
import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { Hero } from '../components/klient/modules/hero/Hero';
import { ProductCollection } from '../components/klient/modules/productCollection/ProductCollection';
import { Layout } from '../components/klient/shared/layout/Layout';
import { useGetProducts } from '../utils/api/queryHooks';

function HomePage() {
  const { data } = useGetProducts();

  if (!data?.data) {
    return (
      <Layout title="Sklep strona główna">
        <Hero />
        Brak produktów.
      </Layout>
    );
  }

  return (
    <Layout title="Sklep strona główna">
      <Hero />
      <ProductCollection products={data.data} />
    </Layout>
  );
}
export const getStaticProps = async () => {
  const queryCache = new QueryCache();
  await useGetProducts.prefetch(queryCache);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 1, // In seconds
  };
};

export default HomePage;
