import { Store16 } from '@carbon/icons-react';
import type { SideNavMenuItemProps } from 'carbon-components-react';
import { SideNav, SideNavItems, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import type { LinkProps } from 'next/link';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type ReactAnchorAttr = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type AdminSidebarMenuItem = {
  readonly label: string;
} & (
  | {
      readonly children: readonly AdminSidebarMenuItem[];
      readonly icon?: React.ComponentType;
    }
  | Readonly<LinkProps>
);

const adminSidebarMenuItems: readonly AdminSidebarMenuItem[] = [
  {
    label: 'Sklep',
    icon: Store16,
    children: [
      {
        label: 'Produkty',
        href: '/admin/products',
      },
      {
        label: 'Dodaj produkt',
        href: '/admin/add-product',
      },
    ],
  },
];

const isItemActive = (pathname: string, item: AdminSidebarMenuItem): boolean => {
  if ('children' in item) {
    return item.children.some((item) => isItemActive(pathname, item));
  } else {
    return item.href === pathname;
  }
};

const AdminSideNavChild = React.memo<{ readonly item: AdminSidebarMenuItem }>(({ item }) => {
  const { pathname } = useRouter();

  const isActive = isItemActive(pathname, item);

  if ('children' in item) {
    return (
      <SideNavMenu
        key={item.label}
        renderIcon={item.icon}
        title={item.label}
        isActive={isActive}
        defaultExpanded={isActive}
      >
        <AdminSideNavChildren items={item.children} />
      </SideNavMenu>
    );
  } else {
    const { label, ...linkProps } = item;
    return (
      <SideNavItemNext key={label} {...linkProps} isActive={isActive}>
        {label}
      </SideNavItemNext>
    );
  }
});
AdminSideNavChild.displayName = 'AdminSideNavChild';

const AdminSideNavChildren = React.memo<{ readonly items: readonly AdminSidebarMenuItem[] }>(
  ({ items }) => {
    return (
      <>
        {items.map((item) => (
          <AdminSideNavChild key={item.label} item={item} />
        ))}
      </>
    );
  },
);
AdminSideNavChildren.displayName = 'AdminSideNavChildren';

type AdminSideNavProps = {
  readonly isSideNavExpanded: boolean;
};
export const AdminSideNav = React.memo<AdminSideNavProps>(({ isSideNavExpanded }) => {
  return (
    <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isChildOfHeader>
      <SideNavItems>
        <AdminSideNavChildren items={adminSidebarMenuItems} />
        {/* <SideNavMenu renderIcon={Analytics16} title="Statistics">
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 1</SideNavMenuItem>
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 2</SideNavMenuItem>
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Finance16} title="Finance">
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 1</SideNavMenuItem>
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 2</SideNavMenuItem>
                <SideNavMenuItem<LinkProps> element={Link} href="">Option 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Group16}>Users</SideNavLink>
              <SideNavLink renderIcon={Fade16}>Link</SideNavLink> */}
      </SideNavItems>
    </SideNav>
  );
});
AdminSideNav.displayName = 'AdminSideNav';

const SideNavMenuItemNextElement = React.memo<
  SideNavMenuItemProps<LinkProps & { readonly attrs?: ReactAnchorAttr }>
>(({ children, attrs, ...linkProps }) => {
  return (
    <NextLink {...linkProps}>
      <a className={linkProps.className} {...attrs}>
        {children}
      </a>
    </NextLink>
  );
});
SideNavMenuItemNextElement.displayName = 'SideNavMenuItemNextElement';

const SideNavItemNext = React.memo<SideNavMenuItemProps<LinkProps>>((props) => {
  const attrs: ReactAnchorAttr = { ...(props.isActive && { 'aria-current': 'page' }) };
  return (
    <SideNavMenuItem<LinkProps & { readonly attrs?: ReactAnchorAttr }>
      element={SideNavMenuItemNextElement}
      {...props}
      attrs={attrs}
    ></SideNavMenuItem>
  );
});
SideNavItemNext.displayName = 'SideNavItemNext';
