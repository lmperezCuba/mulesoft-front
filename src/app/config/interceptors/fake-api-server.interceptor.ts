import { ICartItem } from './../../state-shopping-cart/interfaces/cart-item.interface';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DbService } from '../../fake_server/db.service';
import { Classes } from '../../fake_server/classes.enum';

@Injectable()
export class FakeApiServerInterceptor implements HttpInterceptor {

  constructor(private fakeDBRepository: DbService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Handle fake api server');

    let data = undefined;
    switch (request.url) {
      case 'http://localhost:3000/apiv1/users/create':
        data = this.fakeDBRepository.save(Classes.users, request.body);
        break;
      case 'http://localhost:3000/apiv1/users':
        const users = this.fakeDBRepository.findAll(Classes.users);
        data = { count: users.length, items: users }
        break;
      case 'http://localhost:3000/apiv1/products/create':
        data = this.fakeDBRepository.save(Classes.products, request.body);
        break;
      case 'http://localhost:3000/apiv1/products':
        const products = this.fakeDBRepository.findAll(Classes.products);
        data = { count: products.length, items: products }
        break;
      case 'http://localhost:3000/apiv1/roles/create':
        data = this.fakeDBRepository.save(Classes.roles, request.body);
        break;
      case 'http://localhost:3000/apiv1/roles':
        const roles = this.fakeDBRepository.findAll(Classes.roles);
        data = { count: roles.length, items: roles }
        break;
      case 'http://localhost:3000/apiv1/login':
        console.log('login');
        console.log(request.body);
        const { username, password } = request.body as { username: string, password: string };
        // Simulated seed
        if (username === 'admin' && password === '123') {
          data = { claims: ['ADMIN'] }
        } else if (username === 'user' && password === '123') {
          data = { claims: ['USER'] }
        }
        break;
      case 'http://localhost:3000/apiv1/buy':
        console.log(request.body);
        
        data = this.fakeDBRepository.buy(request.body as ICartItem[]);
        break;
    }
    return of(new HttpResponse({ status: 200, body: data }));
  }
}
