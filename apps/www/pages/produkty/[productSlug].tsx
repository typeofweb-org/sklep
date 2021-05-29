import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { FeaturedProduct } from '../../components/klient/modules/featuredProduct/FeaturedProduct';
import { Layout } from '../../components/klient/shared/components/layout/Layout';
import { useGetProducts, useGetProductBySlug } from '../../utils/api/queryHooks';
import { useParams } from '../../utils/hooks';
import type { InferGetStaticPathsType } from '../../utils/types';

function ProductPage() {
  const productSlug = String(useParams(['productSlug']).productSlug);
  const { data: productResponse } = useGetProductBySlug(productSlug);

  return (
    productResponse?.data && (
      <Layout title={productResponse.data.name}>
        <FeaturedProduct product={productResponse.data} />
      </Layout>
    )
  );
}

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();
  const response = await useGetProducts.prefetch(queryClient);

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
  const queryClient = new QueryClient();
  await useGetProductBySlug.prefetch(queryClient, productSlug);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default ProductPage;
