import type { DataTableCustomRenderProps } from 'carbon-components-react';
import {
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';
import { useRouter } from 'next/router';
import React from 'react';

import { OrdersListCells } from './OrdersListCell';

export const OrdersTable = React.memo<DataTableCustomRenderProps>(
  ({ rows, headers, getHeaderProps, getTableProps, getRowProps, getSelectionProps }) => {
    const router = useRouter();
    return (
      <Table {...getTableProps()} useZebraStyles={true}>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map((header) => {
              return <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                <OrdersListCells key={row.id} row={row} />
                <TableCell key="actions">
                  <OverflowMenu>
                    <OverflowMenuItem
                      itemText="Edit"
                      onClick={() => router.push(`/admin/orders/${row.id}`)}
                    />
                  </OverflowMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
);
OrdersTable.displayName = 'OrdersTable';
