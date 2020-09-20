import React from 'react';

import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';

type AddToCartButtonProps = {
  readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddToCartButton = React.memo<AddToCartButtonProps>(({ onClick }) => {
  return (
    <button
      className="bg-gray-900 text-white w-full rounded-sm p-2 shadow-sm hover:bg-gray-800"
      title="dodaj do koszyka"
      onClick={onClick}
    >
      <div className="flex justify-center transform transition-transform">
        <ShoppingCartIcon className="fill-current text-white" />
        <p className="ml-4 self-end">Do koszyka</p>
      </div>
    </button>
  );
});
AddToCartButton.displayName = 'AddToCartButton';
