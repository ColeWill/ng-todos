import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from './product.model';

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    // these will be renamed to camelcase w/ no spaces
    'Load Individual Product': emptyProps(),
    'Load Individual Products Success': props<{
      product: Product;
    }>(),
    'Load Individual Products Failure': props<{ error: string }>(),
  },
});
