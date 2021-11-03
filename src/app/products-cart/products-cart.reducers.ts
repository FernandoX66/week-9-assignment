import { createReducer, on } from '@ngrx/store';
import { Cart } from './interfaces/cart-interface';
import { deleteCart, removeCart, saveCart } from './products-cart.actions';

export interface State {
  cart: Cart | undefined;
}

export const initialState: State = {
  cart: undefined,
};

export const cartReducer = createReducer(
  initialState,
  on(saveCart, (state, action) => {
    return {
      ...state,
      cart: action.cart,
    };
  }),

  on(deleteCart, (state, action) => {
    return {
      ...state,
      cart: undefined,
    };
  }),

  on(removeCart, (state, action) => {
    return {
      ...state,
      cart: undefined,
    };
  })
);
