import React from 'react';

import { useGetProducts } from '../../../utils/api/queryHooks';
import { ProductsList } from '../productsList/ProductsList';

const PRODUCTS_PAGE_SIZE = 20;

export const AdminProducts = React.memo(() => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetProducts({
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
      products={data?.data ?? []}
      isLoading={isLoading}
      page={page}
      pageSize={PRODUCTS_PAGE_SIZE}
      changePage={handlePageChange}
      productsCount={data?.meta.total ?? 0}
    />
  );
});
AdminProducts.displayName = 'AdminProducts';
