export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  roles?: string[];
}