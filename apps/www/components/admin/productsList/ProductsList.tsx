import type { DenormalizedRow } from 'carbon-components-react';
import { DataTableSkeleton, Pagination, DataTable, TableContainer } from 'carbon-components-react';
import React from 'react';

import type { Nil } from '../../../../api/src/types';
import { DeleteProductConfirmationModal } from '../deleteProductConfirmationModal/DeleteProductConfirmationModal';

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
  changePage(data: { readonly page: number; readonly pageSize: number }): void;
};

export const ProductsList = React.memo<ProductsListProps>(
  ({ isLoading, products, page, pageSize, productsCount, changePage }) => {
    const rows = React.useMemo(() => getRows(products), [products]);

    const handleDeleteAction = React.useCallback(
      (row: DenormalizedRow) => {
        const productId = Number(row.id);
        const product = products.find((p) => p.id === productId);
        setProductForDeletion(product);
      },
      [products],
    );

    // we need 2 states to avoid flash of "UNDEFINED" in the modal
    const [showDeletionModal, setShowDeletionModal] = React.useState(false);
    const [productForDeletion, setProductForDeletion] = React.useState<Nil<Product>>(null);
    React.useEffect(() => setShowDeletionModal(!!productForDeletion), [productForDeletion]);

    const closeDeletionModal = React.useCallback(() => setShowDeletionModal(false), []);
    const deleteProduct = () => {}; // @todo

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
                  pageSizes={[pageSize]}
                  totalItems={productsCount}
                  onChange={changePage}
                />
              </TableContainer>
            );
          }}
        ></DataTable>
        <DeleteProductConfirmationModal
          isOpen={showDeletionModal}
          product={productForDeletion}
          handleDelete={deleteProduct}
          handleClose={closeDeletionModal}
        />
      </section>
    );
  },
);
ProductsList.displayName = 'ProductsList';
