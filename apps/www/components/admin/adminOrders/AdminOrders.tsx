import React from 'react';

import { useGetOrders } from '../../../utils/api/queryHooks';
import { OrdersList } from '../ordersList/OrdersList';

export const AdminOrders = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const { data, isLoading } = useGetOrders({ take: pageSize, skip: (page - 1) * pageSize });

  const handlePageChange = React.useCallback(
    (data: { readonly page: number; readonly pageSize: number }) => {
      setPage(data.page);
      setPageSize(data.pageSize);
    },
    [],
  );

  return (
    <OrdersList
      isLoading={isLoading}
      orders={data?.data ?? []}
      ordersCount={data?.meta.total ?? 0}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
    />
  );
});
AdminOrders.displayName = 'AdminOrders';
