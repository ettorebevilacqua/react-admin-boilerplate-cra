import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
// import LabelIcon from '@material-ui/icons/Label';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useGetIdentity,
} from 'react-admin';

import visitors from '../forms/visitors';
/* import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import categories from '../categories';
import reviews from '../reviews'; */

// import SubMenu from './SubMenu';
import { AppState } from '../types';
// import components from '../forms';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { identity, loading: identityLoading } = useGetIdentity();
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  );
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  useSelector((state: AppState) => state.theme); // force rerender on theme change

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggle = (menu: MenuName) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box mt={1}>
      {' '}
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      <MenuItemLink
        to={`/enti`}
        primaryText="Enti"
        leftIcon={<visitors.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {/* {identity && identity.group && identity.group === 'admin' && (

        <MenuItemLink
          to={`/enti`}
          primaryText="Enti"
          leftIcon={<components.enti.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      )}
         <MenuItemLink
        to={`/Docenti`}
        primaryText={translate(`resources.docenti.name`, {
          smart_count: 2,
        })}
        leftIcon={<components.docenti.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/Corsi`}
        primaryText={translate(`resources.corsi.name`, {
          smart_count: 2,
        })}
        leftIcon={<components.corsi.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/Partecipanti`}
        primaryText="Partecipanti"
        leftIcon={<components.partecipanti.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/moduli`}
        primaryText="Moduli"
        leftIcon={<orders.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/ore`}
        primaryText="Ore"
        leftIcon={<components.ore.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
         <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                sidebarIsOpen={open}
                name="pos.menu.sales"
                icon={<orders.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/commands`}
                    primaryText={translate(`resources.commands.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<orders.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/invoices`}
                    primaryText={translate(`resources.invoices.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<invoices.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="pos.menu.catalog"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/products`}
                    primaryText={translate(`resources.products.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<products.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/categories`}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<categories.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCustomers')}
                isOpen={state.menuCustomers}
                sidebarIsOpen={open}
                name="pos.menu.customers"
                icon={<visitors.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/customers`}
                    primaryText={translate(`resources.customers.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<visitors.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/segments`}
                    primaryText={translate(`resources.segments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to={`/reviews`}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/test`}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />

            */}
      {isXSmall && (
        <MenuItemLink
          to="/configuration"
          primaryText={translate('pos.configuration')}
          leftIcon={<SettingsIcon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      )}
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;
