import { fetcher } from '../../../utils/fetcher';

import type { ProductType } from './ProductsForm';

export const createProduct = async (body: ProductType) => fetcher('/products', 'POST', { body });
