import {
  Analytics16,
  Fade16,
  Finance16,
  Group16,
  Notification20,
  Store16,
  UserProfile20,
} from '@carbon/icons-react';
import {
  SideNav,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  Header as CarbonHeader,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  HeaderPanel,
} from 'carbon-components-react';
import React, { useState } from 'react';

export const Header = () => {
  const [isNotificationExpanded, setNotificationExpand] = useState(false);
  const [isUserInfoExpanded, setUserInfoExpand] = useState(false);

  const toggleNotificationClick = () => {
    setUserInfoExpand(false);
    setNotificationExpand((isExpanded) => !isExpanded);
  };

  const toggleUserInfoClick = () => {
    setNotificationExpand(false);
    setUserInfoExpand((isExpanded) => !isExpanded);
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <CarbonHeader aria-label="Typeofweb shop header">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName prefix="Sklep">typeofweb.com</HeaderName>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={toggleNotificationClick}
              isActive={isNotificationExpanded}
            >
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="User informations"
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

          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isChildOfHeader>
            <SideNavItems>
              <SideNavMenu renderIcon={Store16} title="Shop settings">
                <SideNavMenuItem>Option 1</SideNavMenuItem>
                <SideNavMenuItem>Option 2</SideNavMenuItem>
                <SideNavMenuItem>Option 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Analytics16} title="Statistics">
                <SideNavMenuItem>Option 1</SideNavMenuItem>
                <SideNavMenuItem>Option 2</SideNavMenuItem>
                <SideNavMenuItem>Option 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Finance16} title="Finance">
                <SideNavMenuItem>Option 1</SideNavMenuItem>
                <SideNavMenuItem>Option 2</SideNavMenuItem>
                <SideNavMenuItem>Option 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Group16}>Users</SideNavLink>
              <SideNavLink renderIcon={Fade16}>Link</SideNavLink>
            </SideNavItems>
          </SideNav>
        </CarbonHeader>
      )}
    />
  );
};
Header.displayName = 'Header';
