import React from 'react';

// todo: to implement functionality of this input
export const CartQuantityInput = React.memo(({ quantity, handleChangeQuantity }) => {
  return (
    <input
      type="number"
      id=""
      className="appearance-none w-11 text-center"
      step="1"
      min="0"
      max="99"
      name=""
      onChange={handleChangeQuantity}
      value={quantity}
      placeholder=""
      pattern="[0-9]*"
    />
  );
});
CartQuantityInput.displayName = 'CartQuantityInput';
