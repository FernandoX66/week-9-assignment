import { saveUser } from './login.actions';

describe('Login actions', () => {
  it('should create saveUser action', () => {
    const mockUSer = {
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
      },
      token: 'sjdsXaAvs',
    };
    const action = saveUser({ user: mockUSer });

    expect(action.type).toEqual('[Home page] User login');
    expect(action.user).toEqual(mockUSer);
  });
});
