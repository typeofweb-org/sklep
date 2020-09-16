import React from 'react';

// todo: to implement functionality of this input
export const CartQuantityInput = React.memo(() => {
  return (
    <input
      type="number"
      id=""
      className="appearance-none w-8 text-center"
      step="1"
      min="0"
      max="99"
      name=""
      defaultValue="1"
      placeholder=""
      pattern="[0-9]*"
    />
  );
});
CartQuantityInput.displayName = 'CartQuantityInput';
