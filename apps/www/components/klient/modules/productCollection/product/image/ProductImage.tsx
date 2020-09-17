import React from 'react';

export const ProductImage = React.memo(() => {
  return (
    <div className="hover:grow hover:shadow-lg mb-2">
      <img src="https://picsum.photos/400" alt="Placeholder" className="w-full" />
    </div>
  );
});
ProductImage.displayName = 'ProductImage';
