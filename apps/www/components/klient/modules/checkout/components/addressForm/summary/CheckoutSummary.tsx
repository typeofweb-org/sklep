import React from 'react';

export const CheckoutSummary = React.memo(() => {
  return (
    <div className="w-full md:w-1/3 mb-4">
      <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
      <div className="border border-gray-400 bg-gray-100">Zamówienie</div>
    </div>
  );
});
