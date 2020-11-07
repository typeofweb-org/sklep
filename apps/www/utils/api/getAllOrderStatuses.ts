import { useToWQuery } from '../fetcher';

export const useGetOrderStatuses = () => {
  return useToWQuery(['/orders/statuses', 'GET', {}]);
};
