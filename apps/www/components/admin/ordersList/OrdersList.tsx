import { DataTableSkeleton, Pagination, DataTable, TableContainer } from 'carbon-components-react';
import React from 'react';

import { OrdersTable } from './OrdersTable';
import type { Order } from './utils';
import { headers, getRows } from './utils';

type OrdersListProps = {
  readonly isLoading: boolean;
  readonly orders: readonly Order[];
};

export const OrdersList = React.memo<OrdersListProps>(({ isLoading, orders }) => {
  const rows = React.useMemo(() => getRows(orders), [orders]);

  return (
    <section style={{ maxWidth: '60rem' }}>
      <DataTable
        rows={rows}
        headers={headers}
        render={(props) => {
          return (
            <TableContainer
              title={'Lista zamówień'}
              description="Tutaj możesz przeglądać, edytować i usuwać zamówienia."
            >
              {isLoading ? (
                <DataTableSkeleton
                  style={{ width: '100%' }}
                  showHeader={false}
                  showToolbar={false}
                  columnCount={headers.length}
                  rowCount={20}
                  zebra
                />
              ) : (
                <OrdersTable {...props} />
              )}
              <Pagination
                backwardText="Poprzednia strona"
                forwardText="Następna strona"
                pageNumberText="Numer strony"
                pageSizes={[10, 20, 50, 100]}
                onChange={() => void 0}
              />
            </TableContainer>
          );
        }}
      ></DataTable>
    </section>
  );
});
OrdersList.displayName = 'OrdersList';
