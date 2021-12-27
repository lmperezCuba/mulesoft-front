import { IProduct } from './interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { IPaginateOutDTO } from '../../../config/components/data-grid/component/interface/paginate-out.interface';
import { IPaginateDTO } from '../../../config/components/data-grid/component/interface/paginate.interface';

@Injectable({ providedIn: 'root' })
export class ListService {

  constructor(private httpClient: HttpClient) { }

  /**
   * FindAll users
   * @param input 
   */
  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: any | undefined,
    dataFilter?: any[]
  ): Observable<IPaginateOutDTO<IProduct>> {
    const page: IPaginateDTO = {
      skip: skip,
      take: take,
      sortField: sort,
      orSearchFields: dataFilter,
    };
    return this.httpClient.get<IPaginateOutDTO<IProduct>>("http://localhost:3000/apiv1/products").pipe(
      first(),
      map((x: IPaginateOutDTO<IProduct>) => {
        return {
          count: x.count,
          items: x.items
        }
      })
    );
  }

}
