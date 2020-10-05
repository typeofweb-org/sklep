import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { useToWQuery } from '../../../../utils/fetcher';
import { addToCart } from '../api/addToCart';

// this hook can be extended for the wider purpose
export const useCart = () => {
  const { latestData: cartResponse } = useToWQuery(['/cart', 'POST', {}]);

  const queryCache = useQueryCache();
  const [addToCartMutation] = useMutation(
    (id: number) => {
      return addToCart({ productId: id, quantity: 1 });
    },
    {
      onSuccess: () => {
        void queryCache.refetchQueries('/cart');
      },
    },
  );

  return React.useMemo(
    () => ({
      itemsInCart: cartResponse?.data.totalQuantity ?? 0,
      addToCart: addToCartMutation,
    }),
    [addToCartMutation, cartResponse?.data.totalQuantity],
  );
};
