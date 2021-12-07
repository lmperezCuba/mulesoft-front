import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  DataGridComponent,
  MatPaginatorDataTableComponent,
  MatErrorDataTableComponent,
  MatColumnTableComponent,
  MatOptionTableComponent,
} from './component/data-grid.component';
import { DataGridPaginatorIntl } from './injectable/data-grid-paginator-intl';

@NgModule({
  declarations: [
    DataGridComponent,
    MatPaginatorDataTableComponent,
    MatErrorDataTableComponent,
    MatColumnTableComponent,
    MatOptionTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatMenuModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    DataGridComponent,
    MatPaginatorDataTableComponent,
    MatErrorDataTableComponent,
    MatColumnTableComponent,
    MatOptionTableComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: DataGridPaginatorIntl }],
})
export class DataGridModule {}
