import React from 'react';

type AmountProps = {
  amount: number;
  increaseAmount: () => void;
  decreaseAmount: () => void;
};

export const Amount = React.memo<AmountProps>(({ amount, increaseAmount, decreaseAmount }) => (
  <div className="flex justify-center items-center w-full border-t border-r border-l border-gray-500 py-2 mt-10">
    <button onClick={decreaseAmount} aria-label="Zmniejsz ilość produktu" className="px-2 mr-2">
      &lt;
    </button>
    <p>{amount}</p>
    <button onClick={increaseAmount} aria-label="Zwiększ ilość produktu" className="px-2 ml-2">
      &gt;
    </button>
  </div>
));
