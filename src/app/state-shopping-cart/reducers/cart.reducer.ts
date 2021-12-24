import { createReducer, on } from '@ngrx/store';
import { addItem2Cart, removeItemFromCart, retrievedCartItems } from '../cart.actions';
import { ICartItem } from '../interfaces/cart-item.interface';

export const initialState: ReadonlyArray<ICartItem> = [];

export const cartItemsReducer = createReducer(
  initialState,
  on(addItem2Cart, (state, { cartItem }) => {    
    if (state.find(x => x.uuid === cartItem.uuid)) return state;
    return [...state, cartItem];
  }),
  on(removeItemFromCart, (state, { uuid }) => {
    if (state.find(x => x.uuid === uuid)) return state.filter(x => x.uuid !== uuid);
    return state;
  }),
  on(retrievedCartItems, (state, { cartItems }) => cartItems),
);