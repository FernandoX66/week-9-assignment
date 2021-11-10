import { deleteCart, removeCart, saveCart } from './products-cart.actions';

describe('Products cart actions', () => {
  it('should create saveCart action', () => {
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

    expect(action.type).toEqual('[Cart page] Cart obtained');
    expect(action.cart).toEqual(mockCart);
  });

  it('should create deleteCart action', () => {
    const action = deleteCart();

    expect(action.type).toEqual('[Home page] User logout');
  });

  it('should create deleteCart action', () => {
    const action = removeCart();

    expect(action.type).toEqual('[Cart page] User removed all items');
  });
});
