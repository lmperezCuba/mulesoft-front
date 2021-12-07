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
import { Classes } from 'src/app/fake_server/classes.enum';

@Injectable()
export class FakeApiServerInterceptor implements HttpInterceptor {

  constructor(private fakeDBRepository: DbService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Handle fake api server');
    console.log('Fake JWT verify');

    // const accessToken = this.localstorageService.getKey('accessToken')
    // const isLoggedIn = accessToken !== null
    //if (isLoggedIn) {
    /*  request = request.clone({
        setHeaders: {
          Authorization: `Bearer test`, // Bearer is included
        },
      })*/
    //}
    console.log(request.url);
    let data = undefined;
    switch (request.url) {
      case 'http://localhost:3000/apiv1/users/create':
        data = this.fakeDBRepository.save(Classes.users, request.body);
        break;
      case  'http://localhost:3000/apiv1/users':

      break;
    }
    return of(new HttpResponse({ status: 200, body: '' }));
    // return next.handle(request);
  }
}
