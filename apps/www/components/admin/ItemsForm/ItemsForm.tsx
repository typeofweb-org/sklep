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

import styles from './ItemsForm.module.scss';

const Item = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discountPrice: z.number().optional(),
  isPublic: z.boolean(),
});

type ItemType = z.infer<typeof Item>;

type Dict<T> = {
  [key: string]: T;
};

// We will change it to fetcher and env
const createItem = (payload: ItemType) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });

const validateFormValues = (schema: z.ZodObject<any>) => (values: unknown) => {
  try {
    schema.parse(values);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.errors.reduce((errors: Dict<string>, error) => {
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

export const ItemsForm = () => {
  const [mutate, { isLoading }] = useMutation(createItem);

  const onSubmit = (values: ItemType) => {
    mutate(values);
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validateFormValues(Item)}
      render={({ handleSubmit }) => {
        return (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Field name="name">
              {({ input, meta }) => {
                const isError = meta.error && meta.touched;
                return (
                  <TextInput
                    {...input}
                    id="name"
                    labelText="Item name"
                    placeholder="Insert item name"
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
                    label="Item price"
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
                    label="Item discount prize (Optional)"
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
                    labelText="Item description"
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
                    labelText="This item will show in the application"
                    checked={input.value}
                  />
                );
              }}
            </Field>
            <Button kind="primary" type="submit">
              Add Item
            </Button>
            {isLoading && <Loading />}
          </Form>
        );
      }}
    />
  );
};
