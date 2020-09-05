import React from 'react';

import { Menu } from '../menu/Menu';
import { Topbar } from '../topbar/Topbar';

export const Header = React.memo(() => {
  return (
    <div>
      <Topbar />
      <h1 className="text-center font-sans font-bold text-4xl my-12">Sklep TypeOfWeb</h1>
      <Menu type="desktop" />
    </div>
  );
});
Header.displayName = 'Header';
