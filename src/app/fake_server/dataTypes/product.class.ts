export class Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;

  constructor(name: string, price: number, stock: number) {
    this.id = `uuid-${name}`;  // fake uuid autogenerated
    this.name = name;
    this.price = price;
    this.stock = stock ? stock : Math.random() * 100;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.version = 1;
  }

}