import { createReducer, on } from '@ngrx/store';
import { addItem2Cart, retrievedCartItems } from '../cart.actions';
import { ICartItem } from '../interfaces/cart-item.interface';

export const initialState: ReadonlyArray<ICartItem> = [];

export const cartItemsReducer = createReducer(
  initialState,
  on(addItem2Cart, (state, { cartItem }) => [...state, cartItem]),
  on(retrievedCartItems, (state, { cartItems }) => cartItems),
);