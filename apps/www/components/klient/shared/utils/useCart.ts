import React from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

import { addToCart } from '../api/addToCart';
import { createCart } from '../api/createCart';

// this hook can be extended for the wider purpouse
type UseCart = {
  readonly itemsInCart: number;
  readonly addToCart: (id: number) => void;
};
export const useCart = (): UseCart => {
  const { data } = useQuery('createCart', createCart);

  const queryCache = useQueryCache();
  const [addToCartMutation] = useMutation(
    (id: number) => {
      return addToCart({ productId: id, quantity: 1 });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries('createCart');
      },
    },
  );

  const itemsInCart = React.useMemo(
    () =>
      data?.cartProducts.reduce((sum, product) => {
        if (!data) {
          return sum;
        }
        return sum + product.quantity;
      }, 0),
    [data],
  );

  return React.useMemo(
    () => ({
      itemsInCart: itemsInCart || 0,
      addToCart: addToCartMutation,
    }),
    [addToCartMutation, itemsInCart],
  );
};
