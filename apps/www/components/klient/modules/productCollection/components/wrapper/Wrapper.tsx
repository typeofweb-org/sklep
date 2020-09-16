import React, { ReactElement } from 'react';

import { TopBar } from '../topBar/TopBar';
type WrapperProps = {
  children: ReactElement | ReactElement[];
};

export const Wrapper = React.memo<WrapperProps>(({ children }) => {
  return (
    <section className="bg-white worksans py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <TopBar />
        {children}
      </div>
    </section>
  );
});
Wrapper.displayName = 'Wrapper';
