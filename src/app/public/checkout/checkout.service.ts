import { ICartItem } from './../../state-shopping-cart/interfaces/cart-item.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Buy the products on the shopping cart.
   *
   * @param elementsCart items on the cart
   * @returns server sell
   */
  buy(elementsCart: ICartItem[]): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/apiv1/buy', { items: elementsCart, userId: 'user'});
  }

}
