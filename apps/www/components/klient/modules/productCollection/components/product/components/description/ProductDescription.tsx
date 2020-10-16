import React from 'react';

import { HeartIcon } from '../../../../../../shared/components/icons/HeartIcon';

type ProductDescriptionProps = {
  readonly name: string;
};

export const ProductDescription = React.memo<ProductDescriptionProps>(({ name }) => {
  return (
    <div className="flex justify-between items-center pt-2">
      <p className="text-gray-600 pr-2">{name}</p>
      <div className="flex self-start">
        <button aria-label="Ulubione" className="" title="Dodaj do ulubionych">
          <HeartIcon />
        </button>
      </div>
    </div>
  );
});
ProductDescription.displayName = 'ProductDescription';
