import type { QueryCache } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

export const useGetProducts = () => useToWQuery(['/products', 'GET', {}] as const);
useGetProducts.prefetch = (queryCache: QueryCache) =>
  queryCache.prefetchQuery(['/products', 'GET', {}], () => fetcher('/products', 'GET', {}));

export const useGetProductById = (productId: number) =>
  useToWQuery(['/products/{productId}', 'GET', { params: { productId } }] as const);
