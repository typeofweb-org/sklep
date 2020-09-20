import React from 'react';

type ButtonProps = {
  readonly onClick: React.FormEventHandler<HTMLButtonElement>;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly ariaLabel?: string;
};

export const Button = React.memo<ButtonProps>(
  ({ onClick, type = 'button', ariaLabel, children }) => {
    return (
      <button
        className="bg-gray-900 text-white text-lg w-full rounded-sm mt-4 p-4 shadow-sm hover:bg-gray-800"
        onClick={onClick}
        aria-label={ariaLabel}
        type={type}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
