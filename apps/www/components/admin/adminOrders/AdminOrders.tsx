import React, { useState } from 'react';

import { useGetOrders } from '../../../utils/api/queryHooks';
import { OrdersList } from '../ordersList/OrdersList';

export const AdminOrders = React.memo(() => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { data, isLoading } = useGetOrders();

  const handlePageChange = React.useCallback(
    (data: { readonly page: number; readonly pageSize: number }) => {
      setPage(data.page);
      setPageSize(data.pageSize);
    },
    [],
  );

  return (
    <OrdersList
      page={page}
      pageSize={pageSize}
      isLoading={isLoading}
      orders={data?.data ?? []}
      changePage={handlePageChange}
    />
  );
});
AdminOrders.displayName = 'AdminOrders';
