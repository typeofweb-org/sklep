import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetOrderById } from '../../../utils/api/queryHooks';

export const AdminOrderStatus = React.memo(() => {
  const router = useRouter();
  const orderId = String(router.query.orderId);
  const getOrder = useGetOrderById(orderId);

  return (
    <>
      <Head>
        <title>{'Edytuj zamówienie ' + orderId}</title>
      </Head>
      <form>
        <label>
          Zmień status zamówienie:
          <select value={getOrder.status}>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="ON_HOLD">On hold</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
            <option value="FAILED">Failed</option>
          </select>
        </label>
      </form>
    </>
  );
});

AdminOrderStatus.displayName = 'AdminOrderStatus';
