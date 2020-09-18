import React from 'react';

type ButtonProps = {
  onClick: React.FormEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
};

export const Button = React.memo<ButtonProps>(
  ({ onClick, type = 'button', ariaLabel, children }) => {
    return (
      <button
        className="bg-gray-900 text-white text-lg w-full rounded-sm mt-4 p-4 shadow-sm hover:bg-gray-800"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
