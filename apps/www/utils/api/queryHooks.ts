import type { QueryClient, UseQueryOptions } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any query options
type AnyUseQueryOptions = UseQueryOptions<any>;

export const useGetProducts = (
  query: { readonly take: number; readonly skip: number } | Record<string, never> = {},
) => useToWQuery(['/products', 'GET', { query }] as const);
useGetProducts.prefetch = (queryClient: QueryClient) =>
  queryClient.fetchQuery(['/products', 'GET', { query: {} }], () =>
    fetcher('/products', 'GET', { query: {} }),
  );

export const useGetProductBySlug = (
  productIdOrSlug: string | number,
  queryConfig?: AnyUseQueryOptions,
) =>
  useToWQuery(
    ['/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }] as const,
    queryConfig,
  );
useGetProductBySlug.prefetch = (queryClient: QueryClient, productIdOrSlug: string | number) =>
  queryClient.fetchQuery(
    ['/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }],
    () => fetcher('/products/{productIdOrSlug}', 'GET', { params: { productIdOrSlug } }),
  );

export const useGetOrderById = (orderId: string, queryConfig?: AnyUseQueryOptions) =>
  useToWQuery(['/orders/{orderId}', 'GET', { params: { orderId } }] as const, queryConfig);

export const useGetOrders = (
  query: { readonly take: number; readonly skip: number } | Record<string, never> = {},
) => useToWQuery(['/orders', 'GET', { query }] as const);
useGetOrders.prefetch = (queryClient: QueryClient) =>
  queryClient.fetchQuery(['/orders', 'GET', {}], () => fetcher('/orders', 'GET', { query: {} }));
