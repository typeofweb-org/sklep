import React from 'react';

export const CartSummary = React.memo(() => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 bg-gray-400">
      <h3 className="text-2xl">Podsumowanie</h3>
    </div>
  );
});
CartSummary.displayName = 'CartSummary';
