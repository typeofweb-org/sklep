import { useRouter } from 'next/router';
import React from 'react';

import { useGetOrderById } from '../../../utils/api/queryHooks';
import { OrderForm } from '../orderForm/OrderForm';
import { OrderFormSkeleton } from '../orderForm/OrderFormSkeleton';

export const AdminSingleOrder = React.memo(() => {
  const router = useRouter();
  const orderId = router.query.orderId as string;
  const { latestData, isLoading, isError } = useGetOrderById(orderId, {
    refetchOnReconnect: false,
  });

  if (!orderId) {
    return null;
  }

  return (
    <>
      {isLoading && <OrderFormSkeleton />}
      {latestData && <OrderForm status={latestData.data.status} orderId={orderId} />}
      {isError && <span>Wystąpił błąd podczas pobierania zamówienia.</span>}
    </>
  );
});
AdminSingleOrder.displayName = 'AdminSingleOrder';
