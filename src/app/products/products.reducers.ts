import { createReducer, on } from '@ngrx/store';
import { Product } from '../interfaces/product-interface';
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
    let currentProducts = [];
    let updatedProducts = [];

    for (let i = 0; i < state.products.length; i++) {
      currentProducts[i] = { ...state.products[i] };
    }

    for (let product of currentProducts) {
      if (product.id == action.product.id) {
        updatedProducts.push(action.product);
      } else {
        updatedProducts.push(product);
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
