import { loginSelector, logOutSelector, userSelector } from './login.selectors';

const mockInitialState = {
  user: {
    user: {
      id: 1,
      email: 'test@example.com',
      name: 'Test',
    },
    token: 'SdjfdbhAdv',
  },
};

describe('Login selectors', () => {
  it('should select the user', () => {
    const result = userSelector.projector(mockInitialState);
    expect(result.user?.token).toBe('SdjfdbhAdv');
    expect(result.user?.user.id).toBe(1);
    expect(result.user?.user.email).toBe('test@example.com');
    expect(result.user?.user.name).toBe('Test');
  });

  it('should select user and return if is logged out', () => {
    const result = loginSelector.projector(mockInitialState);
    expect(result).toBeFalsy();
  });

  it('should select user and return if is logged in', () => {
    const result = logOutSelector.projector(mockInitialState);
    expect(result).toBeTruthy();
  });
});
