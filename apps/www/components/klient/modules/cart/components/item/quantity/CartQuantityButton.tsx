import React from 'react';

type CartQuantityButtonProps = {
  readonly text: string;
  readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
  readonly ariaLabel: string;
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
