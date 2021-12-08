import { ListService } from './list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataGridComponent } from '../../../config/components/data-grid/component/data-grid.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(DataGridComponent) dataGrid?: DataGridComponent;

  constructor(public listService: ListService) { }

  ngOnInit(): void {
    console.log('*');
    
    this.listService.findAllPagination().subscribe(x => {
      console.log(x);
      console.log('**');
      
    })
  }

}
