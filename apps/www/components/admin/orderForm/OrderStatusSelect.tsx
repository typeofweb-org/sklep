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
  const { data, isLoading, isError } = useGetOrderStatuses();
  return (
    <>
      {data && (
        <Select {...input} {...getErrorProps(meta)} id="status" labelText="Status zamówienia">
          {data.data.map((orderStatus) => (
            <SelectItem
              key={orderStatus}
              value={orderStatus}
              text={TRANSLATED_STATUS_ORDERS[orderStatus]}
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

export const TRANSLATED_STATUS_ORDERS: Record<
  SklepTypes['getOrdersStatuses200Response']['data'][number],
  string
> = {
  CANCELLED: 'Anulowane',
  COMPLETED: 'Zrealizoawne',
  FAILED: 'Nie powiodło się',
  ON_HOLD: 'Wstrzymane',
  PENDING: 'Oczekiwanie na potwierdzenie',
  PROCESSING: 'Przetwarzane',
  REFUNDED: 'Zrefundowane',
};
