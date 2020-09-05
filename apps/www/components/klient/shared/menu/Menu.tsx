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

  const desktopUlClassNames = type === 'desktop' ? `hidden md:flex justify-center` : '';
  const desktopLiClassName = type === 'desktop' ? `font-bold text-xl mr-4` : '';

  return (
    <ul className={`${mobileUlClassNames} ${desktopUlClassNames}`}>
      <li className={`${mobileLiClassName} ${desktopLiClassName}`}>
        <a href="#">Catalog</a>
      </li>
      <li className={`${mobileLiClassName} ${desktopLiClassName} mr-0`}>
        <a href="#">Home</a>
      </li>
    </ul>
  );
});

Menu.displayName = 'Menu';
