import React from 'react';

type RemoveButtonProps = {
  onClick: () => void;
};

export const RemoveButton = React.memo<RemoveButtonProps>(({ onClick }) => {
  return (
    <button className="cart-item-close-btn p-2" onClick={onClick}>
      &#10005;
    </button>
  );
});
RemoveButton.displayName = 'RemoveButton';
