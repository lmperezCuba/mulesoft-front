import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class DataGridPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = 'Primera página';
  itemsPerPageLabel = `Fila por página:`;
  lastPageLabel = `Ultima página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = `Siguiente página`;
  previousPageLabel = `Anterior página`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `0 de 0`;
    }
    const range = (page + 1) * pageSize;
    return `${page * pageSize + 1} - ${
      range > length ? length : range
    } de ${length}`;
  }
}
