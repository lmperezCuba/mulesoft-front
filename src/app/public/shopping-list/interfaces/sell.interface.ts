import { IProduct } from "../../../admin/products/list/interfaces/product.interface";

export interface ISell {
  id: string;
  products: IProduct[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  version: number;
}