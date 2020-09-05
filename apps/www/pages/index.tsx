import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { ProductCollection } from '../components/klient/modules/productCollection/ProductCollection';
import { Header } from '../components/klient/shared/header/Header';
import { Layout } from '../components/klient/shared/layout/Layout';
import { Product } from '../types/product';

function HomePage({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Sklep strona główna">
      <Header />
      {products.map((p) => (
        <div key={p.id}>{p.description}</div>
      ))}
      <ProductCollection products={products} />
    </Layout>
  );
}
export const getStaticProps = async () => {
  // const res = await fetch('https://.../posts')

  // todo: change with api call result
  const products: Product[] = [
    {
      id: 123,
      name: '123',
      description: 'desc',
      slug: '123',
      isPublic: true,
      regularPrice: 1234,
      discountPrice: 12,
      productType: 'footwear',
    },
    {
      id: 345,
      name: '345',
      description: 'desc',
      slug: '345',
      isPublic: true,
      regularPrice: 3454,
      discountPrice: 12,
      productType: 'footwear',
    },
  ];

  return {
    props: {
      products,
    },
    revalidate: 1, // In seconds
  };
};

export default HomePage;
