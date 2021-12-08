import { ListService } from './list.service';
import { Component, ViewChild } from '@angular/core';
import { DataGridComponent } from '../../../config/components/data-grid/component/data-grid.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @ViewChild(DataGridComponent) dataGrid?: DataGridComponent;

  constructor(public listService: ListService) { }

}
