import { IPaginateOutDTO } from './../../config/components/data-grid/component/interface/paginate-out.interface';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from './../../../app/admin/products/list/interfaces/product.interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<IPaginateOutDTO<IProduct>> = of({ count: 0, items: [] });

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.products$ = this.shopService.findAllPagination();
  }

}
