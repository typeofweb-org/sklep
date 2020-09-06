import {
  Form,
  Button,
  TextInput,
  TextArea,
  NumberInput,
  Loading,
  Checkbox,
} from 'carbon-components-react';
import React from 'react';
import { Form as FinalForm, Field, FieldMetaState } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { createFormValidator } from '../../../utils/createFormValidator';

import styles from './ProductsForm.module.scss';
import { createProduct } from './productsFormUtils';

const productSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().optional(),
  price: Yup.number().required(),
  discountPrice: Yup.number().optional(),
  isPublic: Yup.boolean().required().default(false),
});

export type ProductType = Yup.InferType<typeof productSchema>;

const validator = createFormValidator(productSchema);

function getErrorProps(meta: FieldMetaState<any>) {
  const isInvalid =
    (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;

  return {
    invalid: isInvalid,
    invalidText: meta.error,
  };
}

export const ProductsForm = () => {
  const [mutate, { isLoading }] = useMutation(createProduct);

  const onSubmit = async (values: unknown) => {
    const product = await productSchema.validate(values);
    mutate(product);
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validator}
      validateOnBlur={true}
      render={({ handleSubmit }) => {
        return (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Field name="name">
              {({ input, meta }) => (
                <TextInput
                  {...input}
                  {...getErrorProps(meta)}
                  id="name"
                  labelText="Nazwa produktu"
                  placeholder="Wpisz nazwę produktu"
                />
              )}
            </Field>
            <Field name="price">
              {({ input, meta }) => (
                <NumberInput
                  {...input}
                  {...getErrorProps(meta)}
                  id="price"
                  label="Cena produktu"
                  allowEmpty
                />
              )}
            </Field>
            <Field name="discountPrice">
              {({ input, meta }) => (
                <NumberInput
                  {...input}
                  {...getErrorProps(meta)}
                  id="discount-price"
                  label="Promocyjna cena produktu (Pole opcjonalne)"
                  allowEmpty
                />
              )}
            </Field>
            <Field name="description">
              {({ input, meta }) => (
                <TextArea
                  {...input}
                  {...getErrorProps(meta)}
                  id="description"
                  labelText="Opis produktu"
                />
              )}
            </Field>
            <Field name="isPublic" initialValue={false}>
              {({ input }) => {
                const { value: excludedValue, ...rest } = input;
                return (
                  <Checkbox
                    {...rest}
                    checked={input.value}
                    id="is-public"
                    labelText="Produkt zostanie wyświetlony na stronie"
                  />
                );
              }}
            </Field>
            <Button kind="primary" type="submit">
              Dodaj produkt
            </Button>
            {isLoading && <Loading />}
          </Form>
        );
      }}
    />
  );
};
