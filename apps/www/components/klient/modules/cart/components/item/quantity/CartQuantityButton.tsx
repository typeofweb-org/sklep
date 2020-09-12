import React from 'react';

type CartQuantityButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
};

export const CartQuantityButton = React.memo<CartQuantityButtonProps>(
  ({ text, onClick, ariaLabel }) => {
    return (
      <button className="w-6 border" onClick={onClick} aria-label={ariaLabel}>
        {text}
      </button>
    );
  },
);
CartQuantityButton.displayName = 'CartQuantityButton';
