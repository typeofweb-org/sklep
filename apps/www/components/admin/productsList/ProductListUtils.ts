import type { SklepTypes } from '@sklep/types';

import { PRODUCT_FIELDS } from './ProductFields';

export type Product = SklepTypes['getProducts200Response']['data'][number];

export const headers = PRODUCT_FIELDS.map(({ key, name }) => {
  return {
    key,
    header: name,
  };
});

export const getRows = (products: Product[]) => {
  return products.map((product) => {
    return {
      ...product,
      id: `product-${product.id}`,
    };
  });
};
