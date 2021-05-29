import { Form } from 'carbon-components-react';
import type { ValidationErrors } from 'final-form';
import { setIn } from 'final-form';
import React from 'react';
import type { FieldMetaState, FormProps } from 'react-final-form';
import { Form as FinalForm } from 'react-final-form';
import { InferType, ValidationError } from 'yup';
import type { ObjectSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

export const ToWForm: <Schema extends ObjectSchema<ObjectShape>>(
  props: FormProps<InferType<Schema>> & { validate?: never } & {
    readonly schema: Schema;
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

export const createFormValidator =
  <Schema extends ObjectSchema<any>>(schema: Schema) =>
  (values: InferType<Schema>): ValidationErrors | Promise<ValidationErrors> => {
    try {
      schema.validateSync(values, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        return err.inner.reduce<object>((formError, innerError) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    invalidText: meta.error || meta.submitError,
  };
};
