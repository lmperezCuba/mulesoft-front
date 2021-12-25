import { ICartItem } from './interfaces/cart-item.interface';
import { createAction, props } from "@ngrx/store";

export const addItem2Cart = createAction(
  '[Cart Item List] Add Cart Item',
  props<{ cartItem: ICartItem }>()
);

export const removeItemFromCart = createAction(
  '[Cart Item Collection] Remove Cart Item',
  props<{ uuid: string }>()
);

export const retrievedCartItems = createAction(
  '[Cart Item List/API] Retrieve Cart Items Success',
  props<{ cartItems: ReadonlyArray<ICartItem> }>()
);

export const decrementItemFromCart = createAction(
  '[Cart Item Decrement] Decrement Cart Item',
  props<{ uuid: string }>()
);

export const incrementItemFromCart = createAction(
  '[Cart Item Increment] Increment Cart Item',
  props<{ uuid: string }>()
);