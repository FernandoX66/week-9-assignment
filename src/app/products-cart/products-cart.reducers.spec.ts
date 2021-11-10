import { deleteCart, removeCart, saveCart } from './products-cart.actions';
import { cartReducer, initialState } from './products-cart.reducers';

describe('Products cart reducers', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = cartReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should update cart with saveCart', () => {
    const mockCart = {
      id: '87',
      user_id: '4',
      number: '68',
      status: 'cart',
      total: '125.27',
      total_items: '125.27',
      completed_at: 'null',
      created_at: '2021-11-03T23:47:05.817Z',
      items: [],
    };
    const action = saveCart({ cart: mockCart });
    const state = cartReducer(initialState, action);
    const newState = { cart: mockCart };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should delete cart with deleteCart', () => {
    const action = deleteCart();
    const state = cartReducer(initialState, action);
    const newState = { cart: undefined };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should remove cart with removeCart', () => {
    const action = removeCart();
    const state = cartReducer(initialState, action);
    const newState = { cart: undefined };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
