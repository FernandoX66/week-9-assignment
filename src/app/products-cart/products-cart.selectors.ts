import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './products-cart.reducers';

export const selectCartState = createFeatureSelector<State>('cart');

export const cartSelector = createSelector(
  selectCartState,
  (cart) => cart.cart
);
