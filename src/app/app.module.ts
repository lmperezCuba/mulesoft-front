import { JwtInterceptor } from './config/interceptors/jwt.interceptor';
import { FakeApiServerInterceptor } from './config/interceptors/fake-api-server.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StoreModule } from '@ngrx/store';
import { cartItemsReducer } from './state-shopping-cart/reducers/cart.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({ cartItems: cartItemsReducer})
  ], 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeApiServerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
