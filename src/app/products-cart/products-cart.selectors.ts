import { createSelector } from '@ngrx/store';

export const cartSelector = createSelector(
  (state: any) => state['cart'],
  (cart) => cart.cart
);
