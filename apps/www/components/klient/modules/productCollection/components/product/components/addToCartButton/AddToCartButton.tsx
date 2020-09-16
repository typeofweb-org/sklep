import React from 'react';

import { ShoppingCartIcon } from '../../../../../../shared/icons/ShoppingCartIcon';

type AddToCartButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddToCartButton = React.memo<AddToCartButtonProps>(({ onClick }) => {
  return (
    <button
      className="bg-gray-900 text-white w-full rounded-sm mt-2 p-2 shadow-sm hover:bg-gray-800"
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
