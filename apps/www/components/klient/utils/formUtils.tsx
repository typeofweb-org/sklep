import type { ValidationErrors } from 'final-form';
import { setIn } from 'final-form';
import React from 'react';
import type { FieldMetaState, FormProps } from 'react-final-form';
import { Form as FinalForm } from 'react-final-form';
import { ValidationError } from 'yup';
import type { ObjectSchema, InferType } from 'yup';
import type { ObjectShape } from 'yup/lib/object';

type FinalFormWrapperProps<
  Schema extends ObjectSchema<ObjectShape>,
  InitialFormValues = Partial<InferType<Schema>>,
> = FormProps<InferType<Schema>, InitialFormValues> & {
  readonly schema: Schema;
  readonly className?: string;
};

export const FinalFormWrapper: <
  Schema extends ObjectSchema<ObjectShape>,
  InitialFormValues = Partial<InferType<Schema>>,
>(
  props: FinalFormWrapperProps<Schema, InitialFormValues>,
) => React.ReactElement = ({ schema, onSubmit, className, children, ...props }) => {
  const validate = React.useMemo(() => createFormValidator(schema), [schema]);
  const handleSubmit = React.useCallback<typeof onSubmit>(
    async (values, ...args) => {
      const validatedValues = await schema.validate(values);
      return onSubmit(validatedValues, ...args);
    },
    [onSubmit, schema],
  );

  return (
    <FinalForm {...props} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit }) => {
        return (
          <form className={className} onSubmit={handleSubmit}>
            {children}
          </form>
        );
      }}
    </FinalForm>
  );
};

export const createFormValidator =
  <Schema extends ObjectSchema<ObjectShape>>(schema: Schema) =>
  (values: InferType<Schema>): ValidationErrors | Promise<ValidationErrors> => {
    try {
      schema.validateSync(values, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        return err.inner.reduce((formError, innerError) => {
          return innerError.path
            ? setIn(formError, innerError.path, innerError.message)
            : formError;
        }, {});
      }
      console.error(err);
    }
    return {};
  };

export const getErrorProps = (meta: FieldMetaState<unknown>) => {
  const isInvalid =
    (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;

  return {
    invalid: isInvalid,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it's okay
    invalidText: meta.error,
  };
};
