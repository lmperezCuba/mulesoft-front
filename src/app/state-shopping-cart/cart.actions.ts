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