import { useRouter } from 'next/router';
import React from 'react';
import { QueryCache } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { FeaturedProduct } from '../../components/klient/modules/featuredProduct/FeaturedProduct';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useGetProducts, useGetProductBySlug } from '../../utils/api/queryHooks';
import type { InferGetStaticPathsType } from '../../utils/types';

function ProductPage() {
  const router = useRouter();
  const productSlug = String(router.query.productSlug);
  const { latestData: productResponse } = useGetProductBySlug(productSlug);

  return (
    productResponse?.data && (
      <Layout title={productResponse.data.name}>
        <FeaturedProduct product={productResponse.data} />
      </Layout>
    )
  );
}

export const getStaticPaths = async () => {
  const queryCache = new QueryCache();
  const response = await useGetProducts.prefetch(queryCache);

  return {
    paths:
      response?.data.map((p) => {
        return { params: { productSlug: p.slug } };
      }) ?? [],
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { productSlug },
}: InferGetStaticPathsType<typeof getStaticPaths>) => {
  const queryCache = new QueryCache();
  await useGetProductBySlug.prefetch(queryCache, productSlug);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 60,
  };
};

export default ProductPage;
