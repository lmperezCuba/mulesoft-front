import { Store } from '@ngrx/store';
import { IPaginateOutDTO } from './../../config/components/data-grid/component/interface/paginate-out.interface';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from './../../../app/admin/products/list/interfaces/product.interface';
import { addItem2Cart } from './../../state-shopping-cart/cart.actions';
import { ICartItem } from './../../state-shopping-cart/interfaces/cart-item.interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  products$: Observable<IPaginateOutDTO<IProduct>> = of({ count: 0, items: [] });
  cartItems$ = this.store.select('cartItems');
  elementsOnCard: ICartItem[] = [];
  productsSuscription: Subscription | undefined;
  constructor(private shopService: ShopService, private store: Store<{ cartItems: ICartItem[] }>) { }

  ngOnInit(): void {
    this.products$ = this.shopService.findAllPagination();
    this.productsSuscription = this.cartItems$.subscribe(x => {
      this.elementsOnCard = x;
    })
  }

  ngOnDestroy(): void {
    this.productsSuscription?.unsubscribe();
  }

  /**
   * Add Product to cart
   * @param product details
   */
  onAddItem2Cart(product: IProduct) {
    console.log(product);

    const { id, name, price } = product;
    this.store.dispatch(addItem2Cart({ cartItem: { amount: 0, image: null, price: price, title: name, uuid: id } }));
  }
  /*
      onRemove(bookId: string) {
        this.store.dispatch(removeBook({ bookId }));
      }*/

  isOnCard(productId: string) {
    // this.elementsOnCard.includes(x => x.)
  }

}
