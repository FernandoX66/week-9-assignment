import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './products.reducers';

export const selectProductsState = createFeatureSelector<State>('products');

export const productsSelector = createSelector(
  selectProductsState,
  (products) => products.products
);
