import { createAction, props } from '@ngrx/store';
import { User } from './interfaces/login-interface';

export const saveUser = createAction(
  '[Home page] User login',
  props<{ user: User }>()
);

export const deleteUser = createAction('[Home page] User logout');
