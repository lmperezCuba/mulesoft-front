import { ICartItem } from './state-shopping-cart/interfaces/cart-item.interface';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './admin/products/list/interfaces/product.interface';
import { addItem2Cart } from './state-shopping-cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mulesoft-frontend-angular';

  constructor(private permissionsService: NgxPermissionsService, private store: Store) { }

  ngOnInit(): void {
    this.loadJWT();
    this.loadCart();
  }

  loadJWT() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null)
      this.permissionsService.loadPermissions(JSON.parse(jwt)['claims']);
  }

  loadCart() {
    if (localStorage.getItem('cart')) {
      const cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string);
      for (const item of cart) {
        this.onAddItem2Cart(item);
      }
    }
  }

  /**
   * Add Product to cart
   * @param product details
   */
  onAddItem2Cart(product: ICartItem) {
    this.store.dispatch(addItem2Cart({ cartItem: product }));
  }
}
