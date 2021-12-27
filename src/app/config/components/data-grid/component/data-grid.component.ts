import {
  AfterViewInit,
  AfterContentInit,
  Component,
  Input,
  ViewChild,
  OnDestroy,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentChecked,
} from '@angular/core';
import { merge, Observable, of, Subject, first } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { SelectionModel } from '@angular/cdk/collections';
import {
  MatCellDef,
  MatColumnDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { ISearchFilter } from './interface/search-filter.interface';
import { ISorting } from './interface/sorting.interface';
import { IColumnFilterData } from './interface/column-filter-data.interface';
import { IPaginateOutDTO } from './interface/paginate-out.interface';
import { IRow } from './interface/row.interface';
import { IServeData } from './interface/serve-data.interface';
import { TFilter } from './type/filter.type';
import { AllowedOperation } from './enum/paginate-operator.enum';

@Component({
  selector: 'app-mat-paginator-data-table',
  template: ``,
  styleUrls: ['./data-grid.component.scss'],
})
export class MatPaginatorDataTableComponent {
  @Input() pageSizeOptions = [10, 25, 100];
  @Input() color: ThemePalette;
  @Input() colorProgressBar: ThemePalette;
  @Input() showFirstLastButtons = true;
  @Input() hidePageSize = false;
  @Input() disabled = false;
}

@Component({
  selector: 'app-mat-error-data-table',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./data-grid.component.scss'],
})
export class MatErrorDataTableComponent { }

@Component({
  selector: 'app-mat-option-table',
  template: ``,
  styleUrls: ['./data-grid.component.scss'],
})
export class MatOptionTableComponent {
  @Input() title = '';
  @ContentChild(MatCellDef) cellDef?: MatCellDef;
}

@Component({
  selector: 'app-mat-column-table',
  template: ``,
  styleUrls: ['./data-grid.component.scss'],
})
export class MatColumnTableComponent {
  @Input() title = 'Titulo Vacío';
  @Input() type: 'number' | 'string' | 'date' = 'string';
  @Input() arrowPosition: 'before' | 'after' = 'after';
  @Input() sort = false;
  @Input() filter = true;
  @Input() defaultFilter: TFilter =
    this.type === 'number' ? 'equals' : 'contains';

  @Input() width: string | undefined;
  @Input() minWidth: string | undefined;

  @ContentChild(MatCellDef) cellDef?: MatCellDef;

  constructor(public matColumnDef: MatColumnDef) { }
}

const defaultFindAllPagination = (
  skip?: number | undefined,
  take?: number | undefined,
  sort?: ISorting | undefined,
  dataFilter?: ISearchFilter[] | undefined
): Observable<IPaginateOutDTO<unknown>> => {
  return of({ count: 0, items: [] });
};

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent
  implements AfterContentInit, AfterContentChecked, OnDestroy {
  @Input() verticalLine = false;
  @Input() serviceData: IServeData = {
    findAllPagination: defaultFindAllPagination,
  };

  @Input() selectColumn = true;
  @Input() selectAvailable = true;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable, { static: true }) matTabla?: MatTable<unknown>;

  @ContentChild(MatPaginatorDataTableComponent)
  contentPaginator?: MatPaginatorDataTableComponent;

  @ContentChild(MatErrorDataTableComponent)
  contentError?: MatErrorDataTableComponent;

  @ContentChild(MatOptionTableComponent)
  contentOption?: MatOptionTableComponent;

  @ContentChildren(MatColumnTableComponent)
  contentColumns?: QueryList<MatColumnTableComponent>;

  displayedColumns: string[] = ['select'];
  displayedColumns2: string[] = [];
  displayedButtons: string[] = [];
  dataSource: MatTableDataSource<unknown>;
  selection = new SelectionModel<unknown>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataStructure = new FormGroup({
    filtersState: new FormArray([]),
  });

  /**Paginator variables*/
  pageSizeOptions = [10, 25, 100];
  showFirstLastButtons = true;
  hidePageSize = false;
  colorPaginator: ThemePalette = 'primary';
  colorProgressBar: ThemePalette = 'primary';
  disabledPaginator = false;

  private reloadSubject: Subject<unknown>;

  constructor() {
    this.dataSource = new MatTableDataSource<unknown>([]);
    this.reloadSubject = new Subject<unknown>();
  }
  ngAfterContentChecked(): void {
    this.subscriptionServicesServer();
  }

  ngAfterContentInit(): void {
    this.buildColumns();
    this.buildOption();
    this.initContentPaginator();
  }

  /*ngAfterViewInit(): void {
  
  }*/

  ngOnDestroy(): void {
    this.reloadSubject.unsubscribe();
  }

  get filtersState(): FormArray {
    return this.dataStructure.get('filtersState') as FormArray;
  }

  optionColumn(index: number): string {
    return (this.filtersState.value as IColumnFilterData[])[index]['typeData'];
  }

  resetFilter(id: number): void {
    (this.filtersState.controls[id] as FormGroup).controls[
      'filterData'
    ].setValue('');
    (this.filtersState.controls[id] as FormGroup).controls[
      'filterDataBetween'
    ].setValue('');
    (this.filtersState.controls[id] as FormGroup).controls[
      'optionFilterData'
    ].setValue(this.contentColumns?.toArray()[id].defaultFilter);
  }

  reloadData(): void {
    this.reloadSubject.next(true);
  }

  dataValidFilter(dataColumnFilter: IColumnFilterData): boolean {
    if (dataColumnFilter.typeData === '1') {
      return (
        this.isNumber(dataColumnFilter.filterData) &&
        (dataColumnFilter.filterDataBetween
          ? this.isNumber(dataColumnFilter.filterDataBetween)
          : true)
      );
    }
    return true;
  }

  isNumber(number: string): boolean {
    return !isNaN(+number);
  }

  /**The classification by type is:
   * 1- numbers
   * 2- string
   * 3- date
   */
  getType(type: 'number' | 'string' | 'date'): string {
    if (type.toLowerCase() === 'date' || type.toLowerCase().startsWith('d')) {
      return '3';
    } else if (
      type.toLowerCase() === 'number' ||
      type.toLowerCase().startsWith('n')
    ) {
      return '1';
    } else {
      return '2';
    }
  }

  /** CheckBox methods */

  selectRow(id: string): void {
    if (this.selectAvailable) {
      this.selection.toggle(id);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
    return numSelected === this.resultsLength;
  }

  /** Whether the number of selected elements matches the total number of rows in actually page. */
  isAllSelectedInActuallyPage(): boolean {
    for (const i of this.dataSource.data as IRow[]) {
      if (!this.selection.isSelected(i.id)) {
        return false;
      }
    }
    return true;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (this.isAllSelectedInActuallyPage()) {
      for (const i of this.dataSource.data as IRow[]) {
        this.selection.toggle(i.id);
      }
      return;
    }
    for (const i of this.dataSource.data as IRow[]) {
      this.selection.select(i.id);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(id?: string): string {
    if (!id) {
      return `header`;
    }
    return `${this.selection.isSelected(id) ? 'deselect' : 'select'} row ${id}`;
  }

  private buildColumns(): void {
    this.contentColumns?.forEach((column) => {
      this.filtersState.push(
        new FormGroup({
          filterData: new FormControl(''),
          filterDataBetween: new FormControl(''),
          optionFilterData: new FormControl(column.defaultFilter),
          typeData: new FormControl(this.getType(column.type)),
        })
      );
      this.displayedColumns.push(column.matColumnDef.name);
      if (column.filter) {
        this.displayedColumns2.push(column.matColumnDef.name + '2');
      }
    });
  }

  private buildOption(): void {
    if (this.contentOption?.cellDef) {
      this.displayedColumns.push('option');
    }
  }

  private buildCell(): void {
    this.contentColumns?.forEach((contentColumn) => {
      this.matTabla?._contentColumnDefs.forEach((column) => {
        if (column.name === contentColumn.matColumnDef.name) {
          if (contentColumn.cellDef) {
            column.cell = contentColumn.cellDef;
          }
        } else if (column.name === 'option' && this.contentOption?.cellDef) {
          column.cell = this.contentOption.cellDef;
        }
      });
    });
  }

  private initContentPaginator() {
    this.pageSizeOptions = this.contentPaginator?.pageSizeOptions || [
      10, 25, 100,
    ];
    this.showFirstLastButtons =
      this.contentPaginator?.showFirstLastButtons || true;
    this.hidePageSize = this.contentPaginator?.hidePageSize || false;
    this.colorPaginator = this.contentPaginator?.color || 'primary';
    this.disabledPaginator = this.contentPaginator?.disabled || false;
    this.colorProgressBar =
      this.contentPaginator?.colorProgressBar || 'primary';
  }

  private decorationFilterData(): ISearchFilter[] {
    const dataDecorate: ISearchFilter[] = [];
    let i = 0;

    this.contentColumns?.forEach((column) => {
      const dataColumnFilter: IColumnFilterData = (
        this.filtersState.value as IColumnFilterData[]
      )[i];

      if (
        column.filter &&
        dataColumnFilter.filterData &&
        this.dataValidFilter(dataColumnFilter) &&
        !(
          dataColumnFilter.optionFilterData.toString() === 'between' &&
          !dataColumnFilter.filterDataBetween
        )
      ) {
        const values = [dataColumnFilter.filterData];
        if (dataColumnFilter.filterDataBetween) {
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: 'moreThanOrEqual' as AllowedOperation,
            values: values,
          });
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: 'lessThanOrEqual' as AllowedOperation,
            values: [dataColumnFilter.filterDataBetween],
          });
        } else {
          dataDecorate.push({
            field: column.matColumnDef.name,
            operation: dataColumnFilter.optionFilterData,
            values: values,
          });
        }
      }
      i++;
    });
    return dataDecorate;
  }

  private subscriptionServicesServer(): void {
    /** If the user changes the sort order, reset back to the first page.*/
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    });
    /** If the user changes the filter dates, reset back to the first page.*/
    this.filtersState.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    });

    if (this.sort && this.paginator) {
      merge(
        this.sort.sortChange,
        this.paginator.page,
        this.filtersState.valueChanges.pipe(debounceTime(500)),
        this.reloadSubject.asObservable()
      )
        .pipe(
          startWith({}),
          first(),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.serviceData
              ?.findAllPagination(
                this.skip,
                this.paginator?.pageSize,
                this.sortFilter,
                this.decorationFilterData()
              )
              .pipe(catchError(() => of(null)),
                distinctUntilChanged());
          }),
          map((data: unknown) => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;

            if (data === null) {
              return [];
            }
            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            /**
             * For GraphQL
             */
            this.resultsLength = (data as IPaginateOutDTO<unknown>).count;
            return (data as IPaginateOutDTO<unknown>).items;
          })
        )
        .subscribe((data) => {
          this.buildCell();
          this.dataSource.data = data;
        });
    }
  }

  /** Gets */
  get skip(): number | undefined {
    return this.paginator?.pageSize && this.paginator?.pageIndex
      ? this.paginator?.pageSize * this.paginator?.pageIndex
      : 0;
  }

  get sortFilter(): ISorting | undefined {
    if (this.sort) {
      if (!this.sort.direction) return undefined;
      return {
        selector: this.sort.active,
        desc: this.sort.direction === 'desc',
      };
    }
    return undefined;
  }
}
