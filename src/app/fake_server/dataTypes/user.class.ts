export class User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;

  constructor(username: string, password: string) {
    this.id = 'uuid-X';  // fake uuid autogenerated
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.version = 1;
  }

}