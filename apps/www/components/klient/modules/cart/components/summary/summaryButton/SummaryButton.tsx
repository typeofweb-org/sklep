import React from 'react';

type SummaryButtonProps = {
  readonly onClick: React.FormEventHandler<HTMLButtonElement>;
};

export const SummaryButton = React.memo<SummaryButtonProps>(({ onClick }) => {
  return (
    <button
      className="bg-gray-900 text-white text-lg w-full rounded-sm mt-4 p-4 shadow-sm hover:bg-gray-800"
      onClick={onClick}
      aria-label="Przejdź do płatności"
    >
      Przejdź do płatności
    </button>
  );
});
SummaryButton.displayName = 'SummaryButton';
