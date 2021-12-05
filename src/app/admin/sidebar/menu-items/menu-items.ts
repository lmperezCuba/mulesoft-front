import { Injectable } from '@angular/core';
import { INavItem } from '../menu-list-item/nav-item';

const MENUITEMS: INavItem[] = [
  {
    displayName: 'Users',
    iconName: 'people',
    route: 'admin/users',
  },
  {
    displayName: 'Roles',
    iconName: 'admin_panel_settings',
    route: 'admin/roles',
  },
  {
    displayName: 'Products',
    iconName: 'production_quantity_limits',
    route: 'products',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): INavItem[] {
    return MENUITEMS;
  }
}
