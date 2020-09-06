import { setIn } from 'final-form';
import { ValidationError } from 'yup';
import type { ObjectSchema, InferType } from 'yup';

import type { ProductType } from './ProductsForm';

export const createFormValidator = <T extends ObjectSchema<any>>(schema: T) => (
  values: InferType<typeof schema>,
) => {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      return err.inner.reduce<object>((formError, innerError) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
    }
    console.error(err);
  }
  return {};
};

export const createProduct = (payload: ProductType) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });
