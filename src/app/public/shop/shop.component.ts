import { Store } from '@ngrx/store';
import { IPaginateOutDTO } from './../../config/components/data-grid/component/interface/paginate-out.interface';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from './../../../app/admin/products/list/interfaces/product.interface';
import { addItem2Cart } from './../../state-shopping-cart/cart.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<IPaginateOutDTO<IProduct>> = of({ count: 0, items: [] });

  constructor(private shopService: ShopService, private store: Store) { }

  ngOnInit(): void {
    this.products$ = this.shopService.findAllPagination();
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

}
