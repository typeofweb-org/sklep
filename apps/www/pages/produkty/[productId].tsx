import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { FeaturedProduct } from '../../components/klient/modules/featuredProduct/FeaturedProduct';
import { Header } from '../../components/klient/shared/header/Header';
import { Layout } from '../../components/klient/shared/layout/Layout';
import { Product } from '../../types/product';

function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Sklep strona główna">
      <Header />
      <FeaturedProduct product={product} />
    </Layout>
  );
}

export const getStaticPaths = () => {
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      {
        params: { productId: '345' },
      },
      { params: { productId: '123' } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async () => {
  // const res = await fetch('https://.../product/${params.id}'

  // todo: change with api call result
  const product: Product = {
    id: 345,
    name: '345',
    description: 'desc',
    slug: '345',
    isPublic: true,
    regularPrice: 3454,
    discountPrice: 12,
    productType: 'footwear',
  };

  return {
    props: {
      product,
    },
    revalidate: 1, // In seconds
  };
};

export default ProductPage;
