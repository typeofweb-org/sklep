import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { FeaturedProduct } from '../../components/klient/modules/featuredProduct/FeaturedProduct';
import { Layout } from '../../components/klient/shared/layout/Layout';
import { Product } from '../../types/product';

function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={product.name}>
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
    name: 'Lorem ipsum dolor sit amet,',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum leo non orci fringilla scelerisque nec eget arcu. Aenean id lacinia nunc, cursus condimentum massa. Nunc semper lorem eu erat sollicitudin, gravida vulputate ante eleifend. Cras pretium auctor lorem, sed dignissim ipsum maximus at. Integer at lorem massa. Aliquam leo dui, convallis ac ultrices eget, iaculis eu felis. Aliquam in est accumsan, efficitur erat vitae, scelerisque risus. Etiam vel diam tincidunt, placerat nisi non, convallis lectus. Nulla facilisi. Quisque placerat velit quis augue egestas, et pharetra elit commodo. Nam sollicitudin, est sit amet molestie malesuada, lorem lacus ultricies leo, a dignissim sapien nibh quis justo. Morbi porta magna nec egestas pellentesque. Aenean dictum tortor posuere mi gravida vestibulum. Proin gravida faucibus fringilla. Donec finibus iaculis ultrices. Curabitur sit amet ipsum eu ligula imperdiet dapibus at eu metus.',
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
