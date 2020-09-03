import {
  Form,
  Button,
  TextInput,
  TextArea,
  Checkbox,
  NumberInput,
  FormLabel,
  Loading,
  Toggle,
} from 'carbon-components-react';
import React from 'react';
import { useMutation } from 'react-query';

import styles from './ItemsForm.module.scss';
import { useFormReducer, Item } from './useFormReducer';
// Add Request URL
const createItem = (payload: Item) =>
  fetch('http://api.sklep.localhost:3002/', { method: 'POST', body: JSON.stringify(payload) });

export default function ItemsForm() {
  const [mutate, { isLoading, isError, isSuccess }] = useMutation(createItem);
  const [state, dispatch] = useFormReducer();
  const { name, description, price, discountPrice, isDiscount, isPublic } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDiscount) {
      return mutate(state);
    }
    const { discountPrice, ...rest } = state;
    mutate(rest);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        id="name"
        invalidText="You already added item with this name"
        labelText="Item name"
        placeholder="Insert item name"
        value={name}
        onChange={(e) => dispatch({ type: 'setName', value: e.target.value })}
      />
      <FormLabel htmlFor="price">Enter item price</FormLabel>
      <NumberInput
        id="price"
        value={price}
        onChange={(e) => dispatch({ type: 'setPrice', value: Number(e.target.value) })}
      />
      <Toggle
        id="is-discount"
        labelText="Set a discount for this item"
        toggled={isDiscount}
        onChange={() => dispatch({ type: 'toggleIsDiscount' })}
      />
      <FormLabel htmlFor="price">Discount Price</FormLabel>
      <NumberInput
        id="discount-price"
        helperText="This is optional"
        value={discountPrice || 0}
        onChange={(e) => dispatch({ type: 'setDiscountPrice', value: Number(e.target.value) })}
        disabled={!isDiscount}
      />
      <TextArea
        id="description"
        labelText="Item description"
        value={description}
        onChange={(e) => dispatch({ type: 'setDescription', value: e.target.value })}
      />
      <Checkbox
        id="is-public"
        labelText="This item will show in the application"
        checked={isPublic}
        onChange={() => dispatch({ type: 'toggleIsPublic' })}
      />
      <Button kind="primary" type="submit">
        Add Item
      </Button>
      {isLoading && <Loading />}
    </Form>
  );
}
