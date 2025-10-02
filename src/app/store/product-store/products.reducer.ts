import { createReducer, on } from '@ngrx/store';
import { Product } from '../index';
import { ProductActions } from './product.actions';

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
  on(ProductActions.loadIndividualProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(ProductActions.loadIndividualProductsSuccess, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product],
      loading: true,
      error: null,
    };
  }),
  on(ProductActions.loadIndividualProductsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
);
