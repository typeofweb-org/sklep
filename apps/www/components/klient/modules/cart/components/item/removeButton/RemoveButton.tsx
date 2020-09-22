import React from 'react';

type RemoveButtonProps = {
  readonly onClick: React.FormEventHandler<HTMLButtonElement>;
};

export const RemoveButton = React.memo<RemoveButtonProps>(({ onClick }) => {
  return (
    <button
      className="cart-item-close-btn p-2"
      onClick={onClick}
      aria-label="usuń produkt z koszyka"
    >
      &#10005;
    </button>
  );
});
RemoveButton.displayName = 'RemoveButton';
