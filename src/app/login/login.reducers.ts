import { createReducer, on } from '@ngrx/store';
import { User } from './interfaces/login-interface';
import { deleteUser, saveUser } from './login.actions';

export interface State {
  user: User | undefined;
}

export const initialState: State = {
  user: undefined,
};

export const loginReducer = createReducer(
  initialState,
  on(saveUser, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(deleteUser, (state, action) => {
    return { ...state, user: undefined };
  })
);
