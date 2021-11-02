import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './login.reducers';

export const selectUserState = createFeatureSelector<State>('user');

export const userSelector = createSelector(selectUserState, (user) => user);

export const loginSelector = createSelector(selectUserState, (user) =>
  !user.user ? true : false
);

export const logOutSelector = createSelector(selectUserState, (user) =>
  user.user ? true : false
);
