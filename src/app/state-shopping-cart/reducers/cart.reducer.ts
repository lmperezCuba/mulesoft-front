import { decrementItemFromCart, incrementItemFromCart } from './../cart.actions';
import { createReducer, on } from '@ngrx/store';
import { addItem2Cart, removeItemFromCart, retrievedCartItems } from '../cart.actions';
import { ICartItem } from '../interfaces/cart-item.interface';

export const initialState: ReadonlyArray<ICartItem> = [];

export const cartItemsReducer = createReducer(
  initialState,
  on(addItem2Cart, (state, { cartItem }) => {
    if (state.find(x => x.uuid === cartItem.uuid)) return state;
    localStorage.setItem('cart', JSON.stringify([...state, cartItem])); // persist data
    return [...state, cartItem];
  }),
  on(removeItemFromCart, (state, { uuid }) => {
    if (state.find(x => x.uuid === uuid)) {
      const newState = state.filter(x => x.uuid !== uuid);
      localStorage.setItem('cart', JSON.stringify(newState)); // persist data
      return newState;
    }
    return state;
  }),
  on(decrementItemFromCart, (state, { uuid }) => {
    const newState = state.map(x => {
      if (x.uuid === uuid && x.amount > 1) return {
        ...x, amount: x.amount - 1
      }
      return x;
    });
    localStorage.setItem('cart', JSON.stringify(newState)); // persist data
    return newState;
  }),
  on(incrementItemFromCart, (state, { uuid }) => {
    const newState = state.map(x => {
      if (x.uuid === uuid) return {
        ...x, amount: x.amount + 1
      }
      return x;
    });
    localStorage.setItem('cart', JSON.stringify(newState)); // persist data
    return newState;
  }),
  on(retrievedCartItems, (state, { cartItems }) => cartItems),
);

