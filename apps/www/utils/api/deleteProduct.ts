import { fetcher } from '../fetcher';

export const deleteProduct = (productId: number) => {
  return fetcher('/products/{productId}', 'DELETE', { params: { productId } });
};
