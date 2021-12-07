import { User } from './dataTypes/user.class';
import { Injectable } from '@angular/core';
import { Classes } from './classes.enum';
import { debounceTime, delay, first, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbService {

  users: User[] = []

  constructor() { }

  post<T>(classType: Classes, data: T): Observable<any> {
    console.log('in');
    switch (classType) {
      case 'users':
        const { username, password } = data as unknown as User;
        const user: User = new User(username, password);
        this.users.push(data as unknown as User);
        return of(user);
    }
    throw Error('Some error has ocurred.')
  }
}
