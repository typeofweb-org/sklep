import type { SklepTypes } from '@sklep/types';
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

import { PRODUCT_FIELDS } from './ProductFields';
import styles from './ProductsList.module.scss';
import { ProductsListRow } from './productsListRow/ProductsListRow';

export type Product = SklepTypes['getProducts200Response']['data'][number];

type Props = {
  title?: string;
  description?: string;
  products: Product[];
};

export const ProductsList = React.memo<Props>(({ title = '', description = '', products }) => {
  const headers = PRODUCT_FIELDS.map(({ key, name }) => {
    return {
      key,
      header: name,
    };
  });

  const rows = products.map((product) => {
    return {
      ...product,
      id: product.id.toString(),
    };
  });

  return (
    <section className={styles.productsList}>
      <DataTable
        rows={rows}
        headers={headers}
        render={({ headers, getHeaderProps, getTableProps }) => (
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
