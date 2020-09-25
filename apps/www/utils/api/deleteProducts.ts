import { fetcher } from '../fetcher';

export const deleteProducts = (productsIdsArray: readonly number[]) => {
  return Promise.allSettled(
    productsIdsArray.map((productId) => {
      return fetcher('/products/{productId}', 'DELETE', { params: { productId } });
    }),
  );
};
