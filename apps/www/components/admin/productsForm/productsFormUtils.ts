import { fetcher } from '../../../utils/fetcher';

import type { ProductType } from './ProductsForm';

export const createProduct = async (payload: ProductType) =>
  fetcher('http://api.sklep.localhost:3002/products', 'POST', payload).then((res) => res.json());
