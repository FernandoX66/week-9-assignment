import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as login from './login/login.reducers';
import * as products from './products/products.reducers';
import * as cart from './products-cart/products-cart.reducers';

export interface AppState {
  user: login.State;
  products: products.State;
  cart: cart.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: login.loginReducer,
  products: products.productsReducer,
  cart: cart.cartReducer,
};
