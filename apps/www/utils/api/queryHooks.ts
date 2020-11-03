import type { QueryCache, QueryConfig } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

export const useGetProducts = (query: { readonly take: number; readonly skip: number } | {} = {}) =>
  useToWQuery(['/products', 'GET', { query }] as const);
useGetProducts.prefetch = (queryCache: QueryCache) =>
  queryCache.prefetchQuery(['/products', 'GET', { query: {} }], () =>
    fetcher('/products', 'GET', { query: {} }),
  );

export const useGetProductBySlug = (
  productIdOrSlug: string | number,
  queryConfig?: QueryConfig<any, unknown>,
) =>
  useToWQuery(
    ['/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }] as const,
    queryConfig,
  );
useGetProductBySlug.prefetch = (queryCache: QueryCache, productIdOrSlug: string | number) =>
  queryCache.prefetchQuery(
    ['/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }],
    () => fetcher('/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }),
  );

export const useGetOrderById = (orderId: string, queryConfig?: QueryConfig<any, unknown>) =>
  useToWQuery(['/orders/{orderId}', 'GET', { params: { orderId } }] as const, queryConfig);

export const useGetOrders = (query: { readonly take: number; readonly skip: number } | {} = {}) =>
  useToWQuery(['/orders', 'GET', { query }] as const);
useGetOrders.prefetch = (queryCache: QueryCache) =>
  queryCache.prefetchQuery(['/orders', 'GET', {}], () => fetcher('/orders', 'GET', { query: {} }));
