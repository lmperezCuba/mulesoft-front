import { ICreateRole } from './interfaces/role-create.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new user
   * @param input 
   */
  create(input: ICreateRole): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/apiv1/roles/create", input);
  }
}
