import { User } from './dataTypes/user.class';
import { Injectable } from '@angular/core';
import { Classes } from './classes.enum';

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
