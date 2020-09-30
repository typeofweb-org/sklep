import React from 'react';

export const Button = React.memo<JSX.IntrinsicElements['button']>(
  ({ className = '', ...props }) => {
    return (
      <button
        className={`bg-gray-900 text-white text-lg w-full rounded-sm mt-4 p-4 shadow-sm hover:bg-gray-800 ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
