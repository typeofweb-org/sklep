import React from 'react';

import { ShoppingCartIcon } from '../../../../../../shared/components/icons/ShoppingCartIcon';

type AddToCartButtonProps = {
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly buttonType?: 'submit' | 'reset' | 'button';
};

export const AddToCartButton = React.memo<AddToCartButtonProps>(({ onClick, buttonType }) => {
  return (
    <button
      className="bg-gray-900 text-white w-full rounded-sm mt-2 p-2 shadow-sm hover:bg-gray-800"
      title="Dodaj do koszyka"
      aria-label="Dodaj do koszyka"
      onClick={onClick}
      type={buttonType || 'button'}
    >
      <div className="flex justify-center transform transition-transform">
        <ShoppingCartIcon className="fill-current text-white" />
        <p className="ml-4 self-end">Do koszyka</p>
      </div>
    </button>
  );
});
AddToCartButton.displayName = 'AddToCartButton';
