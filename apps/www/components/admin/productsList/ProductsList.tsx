import { Pagination, DataTable, TableContainer } from 'carbon-components-react';
import React from 'react';

import type { Product } from './ProductListUtils';
import { headers, getRows } from './ProductListUtils';
import styles from './ProductsList.module.scss';
import { ProductsTable } from './ProductsTable';
import { ProductsTableToolbar } from './ProductsTableToolbar';

type ProductsListProps = {
  readonly products: readonly Product[];
  readonly page: number;
  readonly pageSize: number;
  readonly productsCount: number;
  changePage(data: { readonly page: number; readonly pageSize: number }): void;
};

export const ProductsList = React.memo<ProductsListProps>(
  ({ products, page, pageSize, productsCount, changePage }) => {
    const rows = React.useMemo(() => getRows(products), [products]);
    return (
      <section className={styles.productsList}>
        <DataTable
          rows={rows}
          headers={headers}
          render={(props) => {
            return (
              <TableContainer
                title={'Lista produktów'}
                description="Tutaj możesz przeglądać, edytować i usuwać produkty."
              >
                <ProductsTableToolbar {...props} />
                <ProductsTable {...props} />
                <Pagination
                  backwardText="Poprzednia strona"
                  forwardText="Następna strona"
                  page={page}
                  pageNumberText="Numer strony"
                  pageSize={pageSize}
                  pageSizes={[pageSize]}
                  totalItems={productsCount}
                  onChange={changePage}
                />
              </TableContainer>
            );
          }}
        ></DataTable>
      </section>
    );
  },
);
ProductsList.displayName = 'ProductsList';
