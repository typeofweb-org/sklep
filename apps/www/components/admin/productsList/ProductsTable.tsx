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
import React from 'react';

import type { ProductsTableHeader, ProductsTableRow } from './ProductListUtils';
import { ProductsListCells } from './productsListCells/ProductsListCells';

export const ProductsTable = React.memo<
  DataTableCustomRenderProps<ProductsTableRow, ProductsTableHeader>
>(({ rows, headers, getHeaderProps, getTableProps, getRowProps, getSelectionProps }) => {
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
              <ProductsListCells key={row.id} row={row} />
              <TableCell key="actions">
                <OverflowMenu>
                  <OverflowMenuItem itemText="Edit" />
                  <OverflowMenuItem isDelete itemText="Delete" hasDivider />
                </OverflowMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
});
ProductsTable.displayName = 'ProductsTable';
