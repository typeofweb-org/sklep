import { fetcher } from '../../../../utils/fetcher';

export function addToCart(body: { readonly productId: number; readonly quantity: number }) {
  return fetcher('/cart/add', 'PATCH', { body });
}

export function removeFromCart(body: { readonly productId: number }) {
  return fetcher('/cart/remove', 'PATCH', { body });
}

export function setCartQuantity(body: { readonly productId: number; readonly quantity: number }) {
  return fetcher('/cart/set', 'PATCH', { body });
}
