import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { IPaginateOutDTO } from '../../config/components/data-grid/component/interface/paginate-out.interface';
import { IPaginateDTO } from '../../config/components/data-grid/component/interface/paginate.interface';
import { ISell } from './interfaces/sell.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {

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
  ): Observable<IPaginateOutDTO<ISell>> {
    const page: IPaginateDTO = {
      skip: skip,
      take: take,
      sortField: sort,
      orSearchFields: dataFilter,
    };
    const username = 'user';
    return this.httpClient.get<IPaginateOutDTO<ISell>>(`http://localhost:3000/apiv1/sells/${username}`)
      .pipe(
        first(),
        map((x: IPaginateOutDTO<ISell>) => {
          console.log(x);
          
          return {
            count: x.count,
            items: x.items
          }
        })
      );
  }
}
