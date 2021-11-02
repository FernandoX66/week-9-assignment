import { createReducer, on } from '@ngrx/store';
import { Product } from './interfaces/product-interface';
import { rateProduct, saveProducts } from './products.actions';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(saveProducts, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),

  on(rateProduct, (state, action) => {
    let updatedProducts = [];

    for (let i = 0; i < state.products.length; i++) {
      updatedProducts[i] = { ...state.products[i] };
    }

    for (let product of updatedProducts) {
      if (product.id == action.data.product_id) {
        if (action.data.kind == '1') {
          product.likes_up_count += 1;
        } else {
          product.likes_down_count += 1;
        }
      }
    }

    return {
      ...state,
      products: updatedProducts,
    };
  })
);
