import { deleteUser, saveUser } from './login.actions';
import { initialState, loginReducer } from './login.reducers';

describe('Login reducers', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = loginReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should update user with saveUser', () => {
    const mockUSer = {
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
      },
      token: 'sjdsXaAvs',
    };
    const action = saveUser({ user: mockUSer });
    const state = loginReducer(initialState, action);
    const newState = {
      user: mockUSer,
    };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should delete user with deleteUser', () => {
    const action = deleteUser();
    const state = loginReducer(initialState, action);
    const newState = { user: undefined };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
