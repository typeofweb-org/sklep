import type { DenormalizedRow } from 'carbon-components-react';
import { DataTableSkeleton, Pagination, DataTable, TableContainer } from 'carbon-components-react';
import React from 'react';

import type { Product } from './ProductListUtils';
import { headers, getRows } from './ProductListUtils';
import styles from './ProductsList.module.scss';
import { ProductsTable } from './ProductsTable';
import { ProductsTableToolbar } from './ProductsTableToolbar';

type ProductsListProps = {
  readonly isLoading: boolean;
  readonly products: readonly Product[];
  readonly page: number;
  readonly pageSize: number;
  readonly productsCount: number;
  deleteProduct(produt: Product): void;
  changePage(data: { readonly page: number; readonly pageSize: number }): void;
};

export const ProductsList = React.memo<ProductsListProps>(
  ({ isLoading, products, deleteProduct, page, pageSize, productsCount, changePage }) => {
    const rows = React.useMemo(() => getRows(products), [products]);

    const handleDeleteAction = React.useCallback(
      (row: DenormalizedRow) => {
        const productId = Number(row.id);
        const product = products.find((p) => p.id === productId);
        if (product) {
          deleteProduct(product);
        }
      },
      [products, deleteProduct],
    );

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
                  <ProductsTable {...props} onDelete={handleDeleteAction} />
                )}
                <Pagination
                  backwardText="Poprzednia strona"
                  forwardText="Następna strona"
                  page={page}
                  pageNumberText="Numer strony"
                  pageSize={pageSize}
                  pageSizes={[10, 20, 50, 100]}
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
