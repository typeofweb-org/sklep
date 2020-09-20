import React from 'react';

type CartQuantityInputProps = {
  readonly quantity: number;
  readonly handleChangeQuantity: React.FormEventHandler<HTMLInputElement>;
};

// todo: to implement functionality of this input
export const CartQuantityInput = React.memo<CartQuantityInputProps>(
  ({ quantity, handleChangeQuantity }) => {
    return (
      <input
        type="number"
        className="appearance-none w-11 text-center"
        step="1"
        min="0"
        max="99"
        onChange={handleChangeQuantity}
        value={quantity}
      />
    );
  },
);
CartQuantityInput.displayName = 'CartQuantityInput';
