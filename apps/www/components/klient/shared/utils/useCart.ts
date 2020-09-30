import React from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

import { addToCart } from '../api/addToCart';
import { createCart } from '../api/createCart';

// this hook can be extended for the wider purpose
export const useCart = () => {
  const { data } = useQuery('createCart', createCart);

  const queryCache = useQueryCache();
  const [addToCartMutation] = useMutation(
    (id: number) => {
      return addToCart({ productId: id, quantity: 1 });
    },
    {
      onSuccess: () => {
        void queryCache.refetchQueries('createCart');
      },
    },
  );

  const itemsInCart = React.useMemo(() => {
    if (!data) {
      return 0;
    }
    return data?.cartProducts.reduce((sum, product) => {
      return sum + product.quantity;
    }, 0);
  }, [data]);

  return React.useMemo(
    () => ({
      itemsInCart: itemsInCart,
      addToCart: addToCartMutation,
    }),
    [addToCartMutation, itemsInCart],
  );
};
