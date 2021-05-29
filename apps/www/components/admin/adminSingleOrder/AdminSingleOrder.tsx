import React from 'react';

import { useGetOrderById } from '../../../utils/api/queryHooks';
import { useParams } from '../../../utils/hooks';
import { OrderForm } from '../orderForm/OrderForm';
import { OrderFormSkeleton } from '../orderForm/OrderFormSkeleton';

export const AdminSingleOrder = React.memo(() => {
  const { orderId } = useParams(['orderId']);
  const { data, isLoading, isError } = useGetOrderById(orderId, {
    enabled: Boolean(orderId),
  });

  if (!orderId) {
    return null;
  }

  return (
    <>
      {isLoading && <OrderFormSkeleton />}
      {data && <OrderForm status={data.data.status} orderId={orderId} />}
      {isError && <span>Wystąpił błąd podczas pobierania zamówienia.</span>}
    </>
  );
});
AdminSingleOrder.displayName = 'AdminSingleOrder';
