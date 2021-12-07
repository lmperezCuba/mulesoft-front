import { User } from './dataTypes/user.class';
import { Injectable } from '@angular/core';
import { Classes } from './classes.enum';
import { debounceTime, delay, first, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbService {

  users: User[] = []

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
        const { username, password } = data as unknown as User;
        const user: User = new User(username, password);
        this.users.push(data as unknown as User);
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
      case 'users': return this.users;
    }
    throw Error('Some error has ocurred.');
  }
}
