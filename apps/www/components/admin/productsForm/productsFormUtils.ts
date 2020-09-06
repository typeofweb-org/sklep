import type { ProductType } from './ProductsForm';

export const createProduct = (payload: ProductType) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });
