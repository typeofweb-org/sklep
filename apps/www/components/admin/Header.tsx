import { UserProfile20 } from '@carbon/icons-react';
import {
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Header as CarbonHeader,
  HeaderPanel,
} from 'carbon-components-react';
import React, { useState } from 'react';

import { AdminSideNav } from './sideNav/SideNav';

export const Header = () => {
  const [isNotificationExpanded, setNotificationExpand] = useState(false);
  const [isUserInfoExpanded, setUserInfoExpand] = useState(false);

  // const toggleNotificationClick = React.useCallback(() => {
  //   setUserInfoExpand(false);
  //   setNotificationExpand((isExpanded) => !isExpanded);
  // }, []);

  const toggleUserInfoClick = React.useCallback(() => {
    setNotificationExpand(false);
    setUserInfoExpand((isExpanded) => !isExpanded);
  }, []);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <CarbonHeader aria-label="Sklep Type of Web">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Otwórz menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName prefix="Sklep">Type of Web</HeaderName>

          <HeaderGlobalBar>
            {/* @todo
            <HeaderGlobalAction
              aria-label="Powiadomienia"
              onClick={toggleNotificationClick}
              isActive={isNotificationExpanded}
            >
              <Notification20 />
            </HeaderGlobalAction> */}
            <HeaderGlobalAction
              aria-label="Użytkownik"
              onClick={toggleUserInfoClick}
              isActive={isUserInfoExpanded}
            >
              <UserProfile20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>

          <HeaderPanel
            aria-label="Header panel"
            expanded={isNotificationExpanded || isUserInfoExpanded}
          >
            {isNotificationExpanded ? <div>Notifications</div> : <div>User info</div>}
          </HeaderPanel>

          <AdminSideNav isSideNavExpanded={isSideNavExpanded} />
        </CarbonHeader>
      )}
    />
  );
};
Header.displayName = 'Header';
