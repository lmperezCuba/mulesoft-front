import { User } from './dataTypes/user.class';
import { Injectable } from '@angular/core';
import { Classes } from './classes.enum';
import { Product } from './dataTypes/product.class';

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
    console.log('in');
    switch (classType) {
      case 'users':
        const { username, password, email } = data as unknown as User;
        const user: User = new User(username, password, email);
        const users: User[] = this.getItem('users');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
      case 'products':
        const { name, price } = data as unknown as Product;
        const product: Product = new Product(name, price);
        const products: Product[] = this.getItem('products');
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return product;
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
        const users: User[] = JSON.parse(localStorage.getItem('users') as string);
        return users;
      case 'products':
        const products: Product[] = JSON.parse(localStorage.getItem('products') as string);
        return products;
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
}
