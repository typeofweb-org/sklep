import type { QueryCache } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

export const useGetProducts = ({ take, skip }: { readonly take: number; readonly skip: number }) =>
  useToWQuery(['/products', 'GET', { query: { take, skip } }] as const);
useGetProducts.prefetch = (queryCache: QueryCache) =>
  queryCache.prefetchQuery(['/products', 'GET', {}], () =>
    fetcher('/products', 'GET', { query: {} }),
  );

export const useGetProductById = (productId: number) =>
  useToWQuery(['/products/{productId}', 'GET', { params: { productId } }] as const);
