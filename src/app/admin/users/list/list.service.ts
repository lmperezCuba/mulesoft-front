import { IPaginateOutDTO } from './../../../config/components/data-grid/component/interface/paginate-out.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { IPaginateDTO } from '../../../config/components/data-grid/component/interface/paginate.interface';
import { IUser } from './interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ListService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new user
   * @param input 
   */
  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: any | undefined,
    dataFilter?: any[]
  ): Observable<IPaginateOutDTO<IUser>> {
    const page: IPaginateDTO = {
      skip: skip,
      take: take,
      sortField: sort,
      orSearchFields: dataFilter,
    };
    return this.httpClient.get<IPaginateOutDTO<IUser>>("http://localhost:3000/apiv1/users").pipe(
      first(),
      map((x: IPaginateOutDTO<IUser>) => {
        console.log('---');
        console.log(x);
        
        return {
          count: x.count,
          items: x.items
        }
      })
    );
  }

}
