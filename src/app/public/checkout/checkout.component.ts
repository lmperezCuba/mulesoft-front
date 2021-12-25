import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../state-shopping-cart/interfaces/cart-item.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems$ = this.store.select('cartItems');
  elementsCart: ICartItem[] = [];
  totalCost: number = 0;
  displayedColumns: string[] = ['image', 'title', 'amount', 'price'];
  // Suscriptions
  productsSuscription: Subscription | undefined;

  constructor(private store: Store<{ cartItems: ICartItem[] }>) { }

  ngOnInit(): void {
    this.cartItems$.subscribe(x => {
      this.elementsCart = x;
      this.totalCost = 0;
      this.elementsCart.forEach(x => this.totalCost += +x.price * +x.amount);
    })
  }

}
