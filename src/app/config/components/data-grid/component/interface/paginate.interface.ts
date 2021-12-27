import { ISearchFilter } from './search-filter.interface';
import { ISorting } from './sorting.interface';
import { ISelect } from './select.interface';

export interface IPaginateDTO {
  /**
   * Amount of elements to skip
   */
  skip?: number;

  /**
   * Amount of elements to take
   */
  take?: number;

  /**
   * Search AND filters
   */
  searchFields?: ISearchFilter[];

  /**
   * Search OR filters
   */
  orSearchFields?: ISearchFilter[];

  /**
   * Field to sorting
   */
  sortField?: ISorting;

  select?: ISelect[];

  reports?: boolean;

  /**
   * Dataset id of the schema to connect
   */
  datasetId?: number;
}
