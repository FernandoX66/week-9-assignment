import { createReducer, on } from '@ngrx/store';
import { deleteUser } from '../login/login.actions';
import { Cart } from './interfaces/cart-interface';
import { saveCart } from './products-cart.actions';

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

  on(deleteUser, (state, action) => {
    return {
      ...state,
      cart: undefined,
    };
  })
);
