import type { ReactElement } from 'react';
import React from 'react';

import { TopBar } from '../topBar/TopBar';
type ProductCollectionWrapperProps = {
  readonly children: ReactElement | readonly ReactElement[];
};

export const ProductCollectionWrapper = React.memo<ProductCollectionWrapperProps>(
  ({ children }) => {
    return (
      <section className="bg-white worksans py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <TopBar />
          {children}
        </div>
      </section>
    );
  },
);
ProductCollectionWrapper.displayName = 'ProductCollectionWrapper';
