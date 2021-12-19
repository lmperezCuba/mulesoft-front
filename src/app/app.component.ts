import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mulesoft-frontend-angular';

  constructor(private permissionsService: NgxPermissionsService) {}
  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    if(jwt !== null)
    this.permissionsService.loadPermissions(JSON.parse(jwt)['claims']);
  }
}
