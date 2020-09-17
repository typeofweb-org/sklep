import type { SklepTypes } from '@sklep/types';

import { PRODUCT_FIELDS } from './ProductFields';

export type Product = SklepTypes['getProducts200Response']['data'][number];

export const headers = PRODUCT_FIELDS.map(({ name, label }) => {
  return {
    key: name,
    header: label,
  };
});
export type ProductsTableHeader = typeof headers[number];

export const getRows = (products: readonly Product[]) => {
  return products.map((product) => {
    return {
      ...product,
      id: `product-${product.id}`,
      description: product.description?.slice(0, 50) + '…',
      isSelected: undefined,
      isExpanded: undefined,
      disabled: undefined,
    };
  });
};
export type ProductsTableRow = ReturnType<typeof getRows>[number];
