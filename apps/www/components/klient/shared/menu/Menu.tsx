import React from 'react';

interface MenuProps {
  isMobileMenuOpen?: boolean;
  type: 'mobile' | 'desktop';
}

export const Menu = React.memo<MenuProps>(({ isMobileMenuOpen, type }) => {
  const mobileUlClassNames =
    type === 'mobile'
      ? `border-t border-teal-200 w-full mt-2 mb-4 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden`
      : '';
  const mobileLiClassName = type === 'mobile' ? `py-3 font-bold border-b border-teal-200` : '';

  return (
    <ul className={`block ${mobileUlClassNames}`}>
      <li className={`${mobileLiClassName}`}>
        <a href="#">Catalog</a>
      </li>
      <li className={`${mobileLiClassName}`}>
        <a href="#">Home</a>
      </li>
    </ul>
  );
});

Menu.displayName = 'Menu';
