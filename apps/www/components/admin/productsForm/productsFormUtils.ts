import type { ProductType } from './ProductsForm';

export const createProduct = async (payload: ProductType) =>
  fetch('http://api.sklep.localhost:3002/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json());
