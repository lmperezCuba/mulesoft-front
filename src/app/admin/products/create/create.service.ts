import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProduct } from './interfaces/product-create.interface';

@Injectable({ providedIn: 'root' })
export class CreateService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new product
   * @param input 
   */
  create(input: ICreateProduct): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/apiv1/products/create", input);
  }
}
