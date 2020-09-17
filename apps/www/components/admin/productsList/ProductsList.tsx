import { Delete16 } from '@carbon/icons-react';
import type { DataTableCustomRenderProps } from 'carbon-components-react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  Button,
  TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableSelectAll,
  TableSelectRow,
} from 'carbon-components-react';
import React from 'react';

import type { Product, ProductsTableHeader, ProductsTableRow } from './ProductListUtils';
import { headers, getRows } from './ProductListUtils';
import styles from './ProductsList.module.scss';
import { ProductsListCells } from './productsListCells/ProductsListCells';

const renderProductsTableInner = ({
  rows,
  headers,
  getHeaderProps,
  getTableProps,
  getRowProps,
  getSelectionProps,
  getBatchActionProps,
}: DataTableCustomRenderProps<ProductsTableRow, ProductsTableHeader>) => {
  return (
    <TableContainer title={'Lista produktów'} description={'No witam'}>
      <TableToolbar>
        <TableBatchActions {...getBatchActionProps()}>
          <TableBatchAction
            tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
            renderIcon={Delete16}
            onClick={() => console.log('clicked')}
          >
            Delete
          </TableBatchAction>
        </TableBatchActions>
        <TableToolbarContent>
          <Button
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onClick={() => console.log('clicked')}
            size="small"
            kind="primary"
          >
            Add new
          </Button>
        </TableToolbarContent>
      </TableToolbar>
      <Table {...getTableProps()}>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type ProductsListProps = {
  readonly products: readonly Product[];
};

export const ProductsList = React.memo<ProductsListProps>(({ products }) => {
  const rows = React.useMemo(() => getRows(products), [products]);
  return (
    <section className={styles.productsList}>
      <DataTable rows={rows} headers={headers} render={renderProductsTableInner}></DataTable>
    </section>
  );
});
ProductsList.displayName = 'ProductsList';
