import { createSelector } from '@ngrx/store';

export const productsSelector = createSelector(
  (state: any) => state['products'],
  (products) => products.products
);
