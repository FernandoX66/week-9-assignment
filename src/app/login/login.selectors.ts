import { createSelector } from '@ngrx/store';

export const loginSelector = createSelector(
  (state: any) => state['user'],
  (user) => (!user.user ? true : false)
);

export const logOutSelector = createSelector(
  (state: any) => state['user'],
  (user) => (user.user ? true : false)
);
