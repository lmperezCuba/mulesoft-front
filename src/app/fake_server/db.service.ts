import { ICartItem } from './../state-shopping-cart/interfaces/cart-item.interface';
import { Role } from './dataTypes/role.class';
import { User } from './dataTypes/user.class';
import { Injectable } from '@angular/core';
import { Classes } from './classes.enum';
import { Product } from './dataTypes/product.class';
import { Sell } from './dataTypes/sell.class';

@Injectable({ providedIn: 'root' })
export class DbService {

  constructor() { }

  /**
   * Simulated a repository save method
   * @param classType - Fake Entity table name 
   * @param data - to be saved
   * @returns the saved data
   */
  save<T>(classType: Classes, data: T): any {
    switch (classType) {
      case 'users':
        const { username, password, email, roles } = data as unknown as User;
        const user: User = new User(username, password, email, roles);
        const users: User[] = this.getItem('users');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
      case 'products':
        const { name, price, stock } = data as unknown as Product;
        const product: Product = new Product(name, price, stock);
        const _products: Product[] = this.getItem('products');
        _products.push(product);
        localStorage.setItem('products', JSON.stringify(_products));
        return product;
      case 'roles':
        const { rolename } = data as unknown as Role;
        const role: Role = new Role(rolename);
        const _roles: Role[] = this.getItem('roles');
        _roles.push(role);
        localStorage.setItem('roles', JSON.stringify(_roles));
        return role;
      case 'sells':
        const { items, userId } = data as unknown as Sell;
        const sell: Sell = new Sell(items, userId);
        const sells: Sell[] = this.getItem('sells');
        sells.push(sell);
        localStorage.setItem('sells', JSON.stringify(sells));
        return sell;
    }
    throw Error('Some error has ocurred.');
  }

  /**
   * Simulated a repository findAll method
   * @param classType - Fake Entity table name
   * @returns the entity data collection without pagination or filtering.
   */
  findAll(classType: Classes) {
    switch (classType) {
      case 'users':
        const users: User[] = this.getItem('users');
        return users;
      case 'products':
        const products: Product[] = this.getItem('products');
        return products;
      case 'roles':
        const roles: Role[] = this.getItem('roles');
        return roles;
      case 'sells':
        const sells: Sell[] = this.getItem('sells');
        return sells;
    }
    throw Error('Some error has ocurred.');
  }

  /**
   * Save access to localstorage
   * @param key ls key
   */
  private getItem(key: string) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(key) as string)
  }

  /**
   * Simulate a sell
   * @param items to buy
   */
  buy(items: ICartItem[], userId: string) {
    // SAGA transcaction simulation 
    const transaction = true;
    const errors: string[] = [];
    //items.forEach(item => {
    // const product: Product = (this.findAll(Classes.products) as Product[])
    //   .find((x: Product) => x.id === item.uuid);
    // check stock if(item.amount <= product.stock) 
    //});
    if (transaction) {
      this.save(Classes.sells, { items, userId });
    } else {
      throw new Error(errors.join())
    }

  }
}
