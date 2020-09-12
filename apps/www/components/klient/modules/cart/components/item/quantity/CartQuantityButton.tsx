import React from 'react';

type CartQuantityButtonProps = {
  text: string;
  onClick: () => void;
};

export const CartQuantityButton = React.memo<CartQuantityButtonProps>(({ text, onClick }) => {
  return (
    <button className="w-6 border" onClick={onClick}>
      {text}
    </button>
  );
});
CartQuantityButton.displayName = 'CartQuantityButton';
