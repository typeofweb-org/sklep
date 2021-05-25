import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useToWQuery } from '../../../../utils/fetcher';
import { addToCart, removeFromCart, setCartQuantity } from '../api/addToCart';
import { useToast } from '../components/toast/Toast';

export const CART_QUERY_KEY = ['/cart', 'POST', {}] as const;

export const useCart = () => {
  const { data: cartResponse, isLoading } = useToWQuery(CART_QUERY_KEY);

  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync: addToCartMutation } = useMutation(
    ({ productId, quantity }: { readonly productId: number; readonly quantity: number }) =>
      addToCart({ productId, quantity }),
    {
      onSettled: () => queryClient.invalidateQueries(CART_QUERY_KEY),
      onSuccess: () => toast.setIsVisible(true),
    },
  );

  const { mutateAsync: setCartQuantityMutation } = useMutation(
    ({ productId, quantity }: { readonly productId: number; readonly quantity: number }) =>
      setCartQuantity({ productId, quantity }),
    { onSettled: () => queryClient.invalidateQueries(CART_QUERY_KEY) },
  );

  const incrementQuantity = React.useCallback(
    (productId: number) => addToCartMutation({ productId, quantity: 1 }),
    [addToCartMutation],
  );

  const decrementQuantity = React.useCallback(
    (productId: number) => addToCartMutation({ productId, quantity: -1 }),
    [addToCartMutation],
  );

  const { mutateAsync: removeFromCartMutation } = useMutation(
    (id: number) => removeFromCart({ productId: id }),
    {
      onSettled: () => queryClient.invalidateQueries(CART_QUERY_KEY),
    },
  );

  return React.useMemo(
    () => ({
      numberOfItemsInCart: cartResponse?.data.totalQuantity ?? 0,
      cartResponseData: cartResponse?.data,
      addToCart: incrementQuantity,
      addToCartByQuantity: addToCartMutation,
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
      addToCartMutation,
    ],
  );
};
