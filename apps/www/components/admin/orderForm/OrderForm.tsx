import type { SklepTypes } from '@sklep/types';
import { Button, InlineLoading, Select, SelectItem } from 'carbon-components-react';
import React from 'react';
import { Field } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { updateOrder } from '../../../utils/api/updateOrder';
import { getErrorProps, ToWForm } from '../../../utils/formUtils';
import { useToasts } from '../toasts/Toasts';

import { ORDER_STATUSES } from './constants';

type OrderFormProps = {
  readonly status: SklepTypes['getOrdersOrderId200Response']['data']['status'];
  readonly orderId: string;
};

type OrderRequestBody = SklepTypes['putOrdersOrderIdRequestBody'];

const formSchema = Yup.object({
  status: Yup.string().oneOf(ORDER_STATUSES).required().label('Status produktu'),
}).required();

export const OrderForm = React.memo<OrderFormProps>(({ status, orderId }) => {
  const { addToast } = useToasts();

  const memoizedUpdateOrder = React.useCallback(
    (body: OrderRequestBody) => {
      return updateOrder(orderId, body);
    },
    [orderId],
  );

  const [mutate, { isLoading }] = useMutation(memoizedUpdateOrder, {
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
        await mutate(body);
      } catch (err) {
        // @todo
      }
    },
    [mutate],
  );

  return (
    <ToWForm onSubmit={handleSubmit} schema={formSchema} initialValues={{ status }}>
      <Field<string> name="status">
        {({ input, meta }) => (
          <Select {...input} {...getErrorProps(meta)} id="status" labelText="Status zamówienia">
            {ORDER_STATUSES.map((orderStatus) => (
              <SelectItem
                key={orderStatus}
                value={orderStatus}
                text={normalizeOrderStatus(orderStatus)}
              />
            ))}
          </Select>
        )}
      </Field>
      <Button kind="primary" type="submit" disabled={isLoading}>
        {!isLoading && 'Zaaktualizuj status zamówienia'}
        {isLoading && <InlineLoading description="Ładowanie..." />}
      </Button>
    </ToWForm>
  );
});
OrderForm.displayName = 'OrderForm';

function normalizeOrderStatus(orderStatus: SklepTypes['putOrdersOrderIdRequestBody']['status']) {
  return orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1).toLowerCase();
}
