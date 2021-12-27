import { AllowedOperation } from '../enum/paginate-operator.enum';

export interface ISearchFilter {
  field: string;
  operation: AllowedOperation;
  values: string[];
}
