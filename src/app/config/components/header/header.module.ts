import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxPermissionsModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
