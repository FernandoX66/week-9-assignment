import { cartSelector } from './products-cart.selectors';

const mockInitialState = {
  cart: {
    id: '87',
    user_id: '4',
    number: '68',
    status: 'cart',
    total: '125.27',
    total_items: '125.27',
    completed_at: 'null',
    created_at: '2021-11-03T23:47:05.817Z',
    items: [],
  },
};

describe('Products cart selectors', () => {
  it('should select cart', () => {
    const result = cartSelector.projector(mockInitialState);
    expect(result?.id).toBe('87');
    expect(result?.user_id).toBe('4');
    expect(result?.number).toBe('68');
    expect(result?.status).toBe('cart');
    expect(result?.total).toBe('125.27');
    expect(result?.total_items).toBe('125.27');
    expect(result?.completed_at).toBe('null');
    expect(result?.created_at).toBe('2021-11-03T23:47:05.817Z');
    expect(result?.items).toEqual([]);
  });
});
