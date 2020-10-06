import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { useToWQuery } from '../../../../utils/fetcher';
import { addToCart } from '../api/addToCart';

export const useCart = () => {
  const { latestData: cartResponse, isLoading } = useToWQuery(['/cart', 'POST', {}]);

  const queryCache = useQueryCache();
  const [addToCartMutation] = useMutation(
    (id: number) => addToCart({ productId: id, quantity: 1 }),
    {
      onSuccess: () => {
        void queryCache.refetchQueries('/cart');
      },
    },
  );

  return React.useMemo(
    () => ({
      numberOfItemsInCart: cartResponse?.data.totalQuantity ?? 0,
      cartResponseData: cartResponse?.data,
      addToCart: addToCartMutation,
      isLoading,
    }),
    [addToCartMutation, cartResponse?.data, isLoading],
  );
};
