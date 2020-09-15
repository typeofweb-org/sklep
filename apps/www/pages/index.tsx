import React from 'react';
import { makeQueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { Hero } from '../components/klient/modules/hero/Hero';
import { ProductCollection } from '../components/klient/modules/productCollection/ProductCollection';
import { Layout } from '../components/klient/shared/layout/Layout';
import { getProducts } from '../utils/api/getProducts';

function HomePage() {
  const { data } = useQuery('products', getProducts);

  if (!data) {
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
      <ProductCollection products={data} />
    </Layout>
  );
}
export const getStaticProps = async () => {
  const queryCache = makeQueryCache();
  await queryCache.prefetchQuery('products', getProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 1, // In seconds
  };
};

export default HomePage;
