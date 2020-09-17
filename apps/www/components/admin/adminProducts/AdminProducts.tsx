import React from 'react';

import { useGetProducts } from '../../../utils/api/queryHooks';
import { ProductsList } from '../productsList/ProductsList';

const PRODUCTS_PAGE_SIZE = 20;

export const AdminProducts = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const { latestData } = useGetProducts({
    take: PRODUCTS_PAGE_SIZE,
    skip: (page - 1) * PRODUCTS_PAGE_SIZE,
  });

  const handlePageChange = React.useCallback(
    (data: { readonly page: number; readonly pageSize: number }) => {
      setPage(data.page);
    },
    [],
  );

  return (
    <ProductsList
      products={latestData?.data ?? []}
      page={page}
      pageSize={PRODUCTS_PAGE_SIZE}
      changePage={handlePageChange}
      productsCount={latestData?.meta.total ?? 0}
    ></ProductsList>
  );
});
AdminProducts.displayName = 'AdminProducts';
