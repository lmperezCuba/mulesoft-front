/**
 * @DTO ISelect used for typeorm selection
 */
export interface ISelect {
  /**
   * key = alias.fieldName
   */
  key: string;

  /**
   * new key alias
   */
  alias: string;
}
