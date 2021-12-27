import { Component } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class AppSidebarComponent {
  constructor(public menuItems: MenuItems) {}
}
