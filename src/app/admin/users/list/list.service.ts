import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new user
   * @param input 
   */
  list(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:3000/apiv1/users");
  }
}
