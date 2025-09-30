import { createReducer, on } from '@ngrx/store';
import { Product, ProductActions } from '../index';

export interface ProductState {
  products: Product[];
  error: string | null;
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  error: null,
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products,
      loading: true,
      error: null,
    };
  }),
  on(ProductActions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
);
