import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class CheckoutModule { }
