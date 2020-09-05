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
import * as z from 'zod';

import styles from './ProductsForm.module.scss';
import { validateFormValues, createProduct } from './productsFormUtils';

const Product = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discountPrice: z.number().optional(),
  isPublic: z.boolean(),
});

export type ProductType = z.infer<typeof Product>;

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

export const ProductsForm = () => {
  const [mutate, { isLoading }] = useMutation(createProduct);

  const onSubmit = (values: ProductType) => {
    mutate(values);
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validateFormValues(Product)}
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
                    onChange={(e) => input.onChange(Number(e.target.value))}
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
                    onChange={(e) => input.onChange(Number(e.target.value))}
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
