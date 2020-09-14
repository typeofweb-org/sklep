import { Form } from 'carbon-components-react';
import { setIn, ValidationErrors } from 'final-form';
import React from 'react';
import { FieldMetaState, Form as FinalForm, FormProps } from 'react-final-form';
import { ValidationError } from 'yup';
import type { ObjectSchema } from 'yup';

export const ToWForm: <
  FormValues extends object = Record<string, any>,
  InitialFormValues = Partial<FormValues>
>(
  props: Omit<FormProps<FormValues, InitialFormValues>, 'validate'> & {
    schema: ObjectSchema<FormValues>;
    className?: string;
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

export const getErrorProps = (meta: FieldMetaState<any>) => {
  const isInvalid =
    (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;

  return {
    invalid: isInvalid,
    invalidText: meta.error,
  };
};
