import { createReducer, on } from '@ngrx/store';
import { Product } from './interfaces/product-interface';
import { filterProducts, rateProduct, saveProducts } from './products.actions';

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
  }),

  on(filterProducts, (state, action) => {
    let storeProducts = action.products.products;

    if (action.value[0] === 'None') {
      return {
        ...state,
        products: storeProducts,
      };
    }

    let filteredProducts = [];

    for (let product of storeProducts) {
      for (let categorie of action.value) {
        if (
          product.category.name.toLowerCase().includes(categorie.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
      }
    }

    return {
      ...state,
      products: filteredProducts,
    };
  })
);
