import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from 'carbon-components-react';
import React from 'react';

import { headers, getRows, Product } from './ProductListUtils';
import styles from './ProductsList.module.scss';
import { ProductsListRow } from './productsListRow/ProductsListRow';

type Props = {
  title?: string;
  description?: string;
  products: Product[];
};

export const ProductsList = React.memo<Props>(({ title = '', description = '', products }) => {
  return (
    <section className={styles.productsList}>
      <DataTable
        rows={getRows(products)}
        headers={headers}
        render={({ rows, headers, getHeaderProps, getTableProps }) => (
          <TableContainer title={title} description={description}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <ProductsListRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      ></DataTable>
    </section>
  );
});
