import React from 'react';

import { useGetOrders } from '../../../utils/api/queryHooks';
import { OrdersList } from '../ordersList/OrdersList';

export const AdminOrders = React.memo(() => {
  const { data, isLoading } = useGetOrders();

  return <OrdersList isLoading={isLoading} orders={data?.data ?? []} />;
});
AdminOrders.displayName = 'AdminOrders';
