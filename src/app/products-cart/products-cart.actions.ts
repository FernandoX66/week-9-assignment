import { createAction, props } from '@ngrx/store';
import { Cart } from './interfaces/cart-interface';

export const saveCart = createAction(
  '[Cart page] Cart obtained',
  props<{ cart: Cart }>()
);

export const deleteCart = createAction('[Home page] User logout');
