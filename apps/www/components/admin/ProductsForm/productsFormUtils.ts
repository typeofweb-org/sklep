import * as z from 'zod';

import type { ProductType } from './ProductsForm';

const validateFormValues = (schema: z.ZodObject<any>) => (values: unknown) => {
  try {
    schema.parse(values);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.errors.reduce((errors: Record<string, string>, error) => {
        const invalidProperty = error.path[0];
        if (error.code === 'invalid_type') {
          if (error.received === 'undefined') {
            errors[invalidProperty] = 'This is required field';
          }
        }
        return errors;
      }, {});
    }
  }
  return {};
};

const createProduct = (payload: ProductType) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });

export { validateFormValues, createProduct };
