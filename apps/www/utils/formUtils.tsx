import { Form } from 'carbon-components-react';
import type { ValidationErrors } from 'final-form';
import { setIn } from 'final-form';
import React from 'react';
import type { FieldMetaState, FormProps } from 'react-final-form';
import { Form as FinalForm } from 'react-final-form';
import { ValidationError } from 'yup';
import type { ObjectSchema } from 'yup';

export const ToWForm: <
  FormValues extends object = Record<string, any>,
  InitialFormValues = Partial<FormValues>
>(
  props: Omit<FormProps<FormValues, InitialFormValues>, 'validate'> & {
    readonly schema: ObjectSchema<FormValues>;
    readonly className?: string;
  },
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
          <Form className={className} onSubmit={handleSubmit}>
            {children}
          </Form>
        );
      }}
    </FinalForm>
  );
};

export const createFormValidator = <U extends object>(schema: ObjectSchema<U>) => (
  values: U,
): ValidationErrors | Promise<ValidationErrors> => {
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

export const getErrorProps = (meta: FieldMetaState<unknown>) => {
  const isInvalid =
    (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;

  return {
    invalid: isInvalid,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    invalidText: meta.error || meta.submitError,
  };
};
