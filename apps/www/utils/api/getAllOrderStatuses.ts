import type { QueryClient } from 'react-query';

import { fetcher, useToWQuery } from '../fetcher';

export const useGetOrderStatuses = () => {
  return useToWQuery(['/orders/statuses', 'GET', {}], { staleTime: Infinity, cacheTime: Infinity });
};
useGetOrderStatuses.prefetch = (queryClient: QueryClient) => {
  return queryClient.fetchQuery(['/orders/statuses', 'GET', {}], () =>
    fetcher('/orders/statuses', 'GET', {}),
  );
};
