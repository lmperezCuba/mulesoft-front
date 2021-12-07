import { ICreateUser } from './interfaces/user-create.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CreateService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new user
   * @param input 
   */
  create(input: ICreateUser): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/apiv1/users/create", input);
  }
}
