import {
  Form,
  Button,
  TextInput,
  TextArea,
  NumberInput,
  Loading,
  Toggle,
  Checkbox,
} from 'carbon-components-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import styles from './ItemsForm.module.scss';

type Item = {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  isPublic: boolean;
};

// Add Request URL
const createItem = (payload: Item) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });

export const ItemsForm = () => {
  const [mutate, { isLoading, isError, isSuccess }] = useMutation(createItem);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Item) => {
    mutate(data);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="name"
        name="name"
        invalidText="You already added item with this name"
        labelText="Item name"
        placeholder="Insert item name"
        ref={register({ required: true })}
      />

      <NumberInput id="price" name="price" label="Item price" ref={register({ required: true })} />
      <NumberInput
        id="discount-price"
        name="discountPrice"
        label="Item discount prize (Optional)"
        helperText="This is optional"
        ref={register({ required: false })}
      />
      <TextArea
        id="description"
        name="description"
        labelText="Item description"
        ref={register({ required: true })}
      />
      <Checkbox
        id="is-public"
        name="isPublic"
        labelText="This item will show in the application"
        ref={register({ required: true })}
      />
      <Button kind="primary" type="submit">
        Add Item
      </Button>
      {isLoading && <Loading />}
    </Form>
  );
};
