import { Product } from './product.class';
export class Sell {
  id: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;

  constructor(products: Product[]) {
    this.id = `uuid-${Math.random() * 100}`;  // fake uuid autogenerated
    this.products = products;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.version = 1;
  }

}