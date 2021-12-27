import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { removeItemFromCart } from '../../../../state-shopping-cart/cart.actions';
import { ICartItem } from '../../../../state-shopping-cart/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$ = this.store.select('cartItems');
  elementsCart: ICartItem[] = [];
  totalCost: number = 0;
  // Suscriptions
  productsSuscription: Subscription | undefined;

  constructor(private store: Store<{ cartItems: ICartItem[] }>, private router: Router) { }

  ngOnInit(): void {
    this.cartItems$.subscribe(x => {
      this.elementsCart = x;
      this.totalCost = 0;
      this.elementsCart.forEach(x => this.totalCost += +x.price);
    })
  }

  ngOnDestroy(): void {
    this.productsSuscription?.unsubscribe();
  }

  /**
   * Remove Product from cart
   * @param productId id
   */
  onRemoveItemFromCart(productId: string) {
    this.store.dispatch(removeItemFromCart({ uuid: productId }));
  }

  /**
   * Redirect to checkout page
   */
  checkout() {
    this.router.navigate(['public', 'checkout'])
  }
}
