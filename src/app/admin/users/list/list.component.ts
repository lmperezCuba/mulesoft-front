import { ListService } from './list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    console.log('*');
    
    this.listService.list().subscribe(x => {
      console.log(x);
      console.log('**');
      
    })
  }

}
