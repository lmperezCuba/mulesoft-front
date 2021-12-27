import { AllowedOperation } from '../enum/paginate-operator.enum';

export interface IColumnFilterData {
  filterData: string;
  filterDataBetween: string;
  optionFilterData: AllowedOperation;
  typeData: string;
}
