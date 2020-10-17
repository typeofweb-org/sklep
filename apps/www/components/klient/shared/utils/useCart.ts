import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { useToWQuery } from '../../../../utils/fetcher';
import { addToCart, removeFromCart, setCartQuantity } from '../api/addToCart';
import { useToast } from '../components/toast/Toast';

export const CART_QUERY_KEY = ['/cart', 'POST', {}] as const;

export const useCart = () => {
  const { latestData: cartResponse, isLoading } = useToWQuery(CART_QUERY_KEY);

  const queryCache = useQueryCache();
  const toast = useToast();

  const [addToCartMutation] = useMutation(
    ({ productId, quantity }: { readonly productId: number; readonly quantity: number }) =>
      addToCart({ productId, quantity }),
    {
      onSettled: () => queryCache.invalidateQueries(CART_QUERY_KEY),
      onSuccess: () => toast.setIsVisible(true),
    },
  );

  const [setCartQuantityMutation] = useMutation(
    ({ productId, quantity }: { readonly productId: number; readonly quantity: number }) =>
      setCartQuantity({ productId, quantity }),
    { onSettled: () => queryCache.invalidateQueries(CART_QUERY_KEY) },
  );

  const incrementQuantity = React.useCallback(
    (productId: number) => addToCartMutation({ productId, quantity: 1 }),
    [addToCartMutation],
  );

  const decrementQuantity = React.useCallback(
    (productId: number) => addToCartMutation({ productId, quantity: -1 }),
    [addToCartMutation],
  );

  const [removeFromCartMutation] = useMutation((id: number) => removeFromCart({ productId: id }), {
    onSettled: () => queryCache.invalidateQueries(CART_QUERY_KEY),
  });

  return React.useMemo(
    () => ({
      numberOfItemsInCart: cartResponse?.data.totalQuantity ?? 0,
      cartResponseData: cartResponse?.data,
      addToCart: incrementQuantity,
      removeFromCart: removeFromCartMutation,
      incrementQuantity: incrementQuantity,
      decrementQuantity: decrementQuantity,
      setCartQuantity: setCartQuantityMutation,
      isLoading,
    }),
    [
      cartResponse?.data,
      decrementQuantity,
      incrementQuantity,
      isLoading,
      removeFromCartMutation,
      setCartQuantityMutation,
    ],
  );
};
