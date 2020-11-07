import type { SklepTypes } from '@sklep/types';
import { Select, SelectItem, SelectSkeleton } from 'carbon-components-react';
import React from 'react';
import type { FieldInputProps, FieldMetaState } from 'react-final-form';

import { useGetOrderStatuses } from '../../../utils/api/getAllOrderStatuses';
import { getErrorProps } from '../../../utils/formUtils';

type OrderStatusSelectProps = {
  readonly input: FieldInputProps<string, HTMLElement>;
  readonly meta: FieldMetaState<unknown>;
};
export const OrderStatusSelect = React.memo<OrderStatusSelectProps>(({ input, meta }) => {
  const { latestData, isLoading, isError } = useGetOrderStatuses();
  return (
    <>
      {latestData && (
        <Select {...input} {...getErrorProps(meta)} id="status" labelText="Status zamówienia">
          {latestData.data.map((orderStatus) => (
            <SelectItem
              key={orderStatus}
              value={orderStatus}
              text={normalizeOrderStatus(orderStatus)}
            />
          ))}
        </Select>
      )}
      {isLoading && <SelectSkeleton />}
      {isError && <span>Wystąpił błąd podczas pobierania możliwych statusów zamówienia</span>}
    </>
  );
});
OrderStatusSelect.displayName = 'OrderStatusSelect';

export function normalizeOrderStatus(
  orderStatus: SklepTypes['getOrdersStatuses200Response']['data'][number],
) {
  switch (orderStatus) {
    case 'CANCELLED':
      return 'Anulowane';
    case 'COMPLETED':
      return 'Zrealizoawne';
    case 'FAILED':
      return 'Nie powiodło się';
    case 'ON_HOLD':
      return 'Wstrzymane';
    case 'PENDING':
      return 'Oczekiwanie na potwierdzenie';
    case 'PROCESSING':
      return 'Przetwarzane';
    case 'REFUNDED':
      return 'Zrefundowane';
  }
}
