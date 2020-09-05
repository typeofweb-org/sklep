import React from 'react';

import { Topbar } from '../topbar/Topbar';

export const Header = React.memo(() => {
  return <Topbar />;
});
Header.displayName = 'Header';
