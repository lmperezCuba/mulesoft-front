import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../config/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
        canActivate: [AuthGuard],
        data: {
          expectedRoles: ['USER']
        }
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
        canActivate: [AuthGuard],
        data: {
          expectedRoles: ['USER']
        }
      },
      {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
        canActivate: [AuthGuard],
        data: {
          expectedRoles: ['USER']
        }
      },
      {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
