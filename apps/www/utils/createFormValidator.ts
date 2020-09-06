import { setIn } from 'final-form';
import { ValidationError } from 'yup';
import type { ObjectSchema, InferType } from 'yup';

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
