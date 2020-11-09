import type { SklepTypes } from '@sklep/types';
import { Button, InlineLoading } from 'carbon-components-react';
import React from 'react';
import { Field } from 'react-final-form';
import { useMutation, useQueryCache } from 'react-query';
import * as Yup from 'yup';

import { useGetOrderStatuses } from '../../../utils/api/getAllOrderStatuses';
import { updateOrder } from '../../../utils/api/updateOrder';
import { ToWForm } from '../../../utils/formUtils';
import { serverErrorHandler } from '../productsForm/utils/serverErrorHandler';
import { useToasts } from '../toasts/Toasts';

import { OrderStatusSelect } from './OrderStatusSelect';

type OrderFormProps = {
  readonly status: SklepTypes['getOrdersOrderId200Response']['data']['status'];
  readonly orderId: string;
};

type OrderRequestBody = SklepTypes['putOrdersOrderIdRequestBody'];

const ORDERS_QUERY_KEY = ['/orders', 'GET'] as const;

export const OrderForm = React.memo<OrderFormProps>(({ status, orderId }) => {
  const { addToast } = useToasts();
  const { latestData } = useGetOrderStatuses();
  const cache = useQueryCache();

  const formSchema = React.useMemo(() => {
    return Yup.object({
      status: Yup.string()
        .oneOf(latestData ? latestData.data : [])
        .required()
        .label('Status produktu'),
    }).required();
  }, [latestData]);

  const memoizedUpdateOrder = React.useCallback(
    (body: OrderRequestBody) => {
      return updateOrder(orderId, body);
    },
    [orderId],
  );

  const [mutate, { isLoading }] = useMutation(memoizedUpdateOrder, {
    onSettled: () => cache.invalidateQueries(ORDERS_QUERY_KEY),
    onSuccess() {
      addToast({
        kind: 'success',
        title: 'Operacja udana',
        caption: 'Dane zamówienia zostały pomyślnie zaaktualizowane',
      });
    },
    onError() {
      addToast({
        kind: 'error',
        title: 'Coś się nie powiodło',
        caption: 'Nie udało się aktualizować danych zamówienia',
      });
    },
  });

  // We can also pass mutate as handleSubmit, except that current form supports error handling behaviour
  const handleSubmit = React.useCallback(
    async (body: OrderRequestBody) => {
      try {
        return await mutate(body);
      } catch (err) {
        return serverErrorHandler(err);
      }
    },
    [mutate],
  );

  if (!latestData) {
    return null;
  }

  return (
    <ToWForm onSubmit={handleSubmit} schema={formSchema} initialValues={{ status }}>
      <Field<string> name="status">
        {({ input, meta }) => <OrderStatusSelect input={input} meta={meta} />}
      </Field>
      <Button kind="primary" type="submit" disabled={isLoading}>
        {!isLoading && 'Zaaktualizuj status zamówienia'}
        {isLoading && <InlineLoading description="Ładowanie..." />}
      </Button>
    </ToWForm>
  );
});
OrderForm.displayName = 'OrderForm';
