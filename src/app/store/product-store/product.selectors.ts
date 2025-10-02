import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => {
    return [...state.products].sort((a, b) => a.id - b.id);
  },
);

export const selectLatestProduct = createSelector(
  selectProductState,
  (state: ProductState) => {
    if (state.products.length === 0) {
      return null;
    } else {
      return state.products.reduce((accumulator, currentVal) =>
        accumulator.id > currentVal.id ? accumulator : currentVal,
      );
    }
  },
);
