import { rateProduct, saveProducts } from './products.actions';
import { initialState, productsReducer } from './products.reducers';

describe('Products reducers', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = productsReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should update products with SaveProducts', () => {
    const action = saveProducts({ products: [] });
    const state = productsReducer(initialState, action);
    const newState = { products: [] };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
