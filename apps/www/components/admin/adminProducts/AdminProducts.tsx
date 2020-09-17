import React from 'react';

import { useGetProducts } from '../../../utils/api/queryHooks';
import { ProductsList } from '../productsList/ProductsList';

export const AdminProducts = React.memo(() => {
  const { latestData } = useGetProducts();

  return <ProductsList products={latestData?.data ?? []} title="" description="" />;
});
AdminProducts.displayName = 'AdminProducts';
