import { ISorting } from './sorting.interface';
import { ISearchFilter } from './search-filter.interface';
import { Observable } from 'rxjs';

export interface IServeData {
  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: ISorting | undefined,
    dataFilter?: ISearchFilter[]
  ): Observable<unknown>;
}
