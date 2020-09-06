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
import { Form as FinalForm, Field } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import styles from './ProductsForm.module.scss';
import { createFormValidator, createProduct } from './productsFormUtils';

const productSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().optional(),
  price: Yup.number().required(),
  discountPrice: Yup.number().optional(),
  isPublic: Yup.boolean().required().default(false),
});

export type ProductType = Yup.InferType<typeof productSchema>;

type FieldWrapperProps = {
  name: string;
  fieldComponent: React.ComponentType;
  fieldComponentProps: {};
};
const FieldWrapper = ({
  name,
  fieldComponent: FieldComponent,
  fieldComponentProps,
}: FieldWrapperProps) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        const isError = meta.error && meta.touched;
        return (
          <FieldComponent
            {...input}
            {...fieldComponentProps}
            invalid={isError}
            invalidText={meta.error}
          />
        );
      }}
    />
  );
};

const validator = createFormValidator(productSchema);

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
            {/* <FieldWrapper name="name" fieldComponent={TextInput} fieldComponentProps={{}} /> */}
            <Field name="name">
              {({ input, meta }) => {
                const isError = meta.error && meta.touched;
                return (
                  <TextInput
                    {...input}
                    id="name"
                    labelText="Nazwa produktu"
                    placeholder="Wpisz nazwę produktu"
                    invalid={isError}
                    invalidText={meta.error}
                  />
                );
              }}
            </Field>
            <Field name="price">
              {({ input, meta }) => {
                const isError = meta.error && meta.touched;
                return (
                  <NumberInput
                    {...input}
                    id="price"
                    label="Cena produktu"
                    allowEmpty
                    invalid={isError}
                    invalidText={meta.error}
                  />
                );
              }}
            </Field>
            <Field name="discountPrice">
              {({ input, meta }) => {
                const isError = meta.error && meta.touched;
                return (
                  <NumberInput
                    {...input}
                    id="discount-price"
                    label="Promocyjna cena produktu (Pole opcjonalne)"
                    allowEmpty
                    invalid={isError}
                    invalidText={meta.error}
                  />
                );
              }}
            </Field>
            <Field name="description">
              {({ input, meta }) => {
                const isError = meta.error && meta.touched;
                return (
                  <TextArea
                    {...input}
                    id="description"
                    labelText="Opis produktu"
                    invalid={isError}
                    invalidText={meta.error}
                  />
                );
              }}
            </Field>
            <Field name="isPublic" initialValue={false}>
              {({ input }) => {
                const { value: excludedValue, ...rest } = input;
                return (
                  <Checkbox
                    {...rest}
                    id="is-public"
                    labelText="Produkt zostanie wyświetlony na stronie"
                    checked={input.value}
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
