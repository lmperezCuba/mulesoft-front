import { NavService } from './sidebar/menu-list-item/nav.service';
import { MenuItems } from './sidebar/menu-items/menu-items';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './sidebar/menu-list-item/menu-list-item.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { HeaderModule } from './../config/components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AdminComponent,
    AppSidebarComponent,
    MenuListItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [MenuItems, NavService]
})
export class AdminModule { }
