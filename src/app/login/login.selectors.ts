import { createSelector } from '@ngrx/store';

export const userSelector = createSelector(
  (state: any) => state['user'],
  (user) => user
);

export const loginSelector = createSelector(
  (state: any) => state['user'],
  (user) => (!user.user ? true : false)
);

export const logOutSelector = createSelector(
  (state: any) => state['user'],
  (user) => (user.user ? true : false)
);
