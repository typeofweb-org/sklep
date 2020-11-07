import type { SklepTypes } from '@sklep/types';

import { formatCurrency } from '../../../utils/currency';

import { PRODUCT_FIELDS } from './ProductFields';

export type Product = SklepTypes['getProducts200Response']['data'][number];

export const headers = [
  ...PRODUCT_FIELDS.map(({ name, label }) => {
    return {
      key: name,
      header: label,
    };
  }),
  { key: 'actions', header: 'Actions' },
];
export type ProductsTableHeader = typeof headers[number];

export const getRows = (products: readonly Product[]) => {
  return products.map((product) => {
    return {
      ...product,
      regularPrice: formatCurrency(product.regularPrice / 100),
      discountPrice: product.discountPrice && formatCurrency(product.discountPrice / 100),
      id: String(product.id),
      description: product.description?.slice(0, 50) + '…',
      isSelected: undefined,
      isExpanded: undefined,
      disabled: undefined,
    };
  });
};
export type ProductsTableRow = ReturnType<typeof getRows>[number];
