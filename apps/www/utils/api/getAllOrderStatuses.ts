import type { QueryCache } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

export const useGetOrderStatuses = () => {
  return useToWQuery(['/orders/statuses', 'GET', {}], { staleTime: Infinity, cacheTime: Infinity });
};
useGetOrderStatuses.prefetch = (queryCache: QueryCache) =>
  queryCache.prefetchQuery(['/orders/statuses', 'GET', {}], () =>
    fetcher('/orders/statuses', 'GET', {}),
  );
