import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DataGridModule } from '../../config/components/data-grid/data-grid.module';

@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    DataGridModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ShoppingListModule { }
