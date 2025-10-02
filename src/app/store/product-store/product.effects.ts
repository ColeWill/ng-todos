import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product, ProductActions } from '../index';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable()
export class ProductsEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);
  productService = inject(ProductService);

  constructor() {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadIndividualProduct),
      mergeMap(() =>
        this.productService.getProductsInInterval().pipe(
          map((productOrError: Product | any) => {
            if (productOrError && productOrError.name === 'AjaxError') {
              const errorMessage = `API Request failed: ${productOrError.message} for URL: ${productOrError.request.url}`;
              return ProductActions.loadIndividualProductsFailure({
                error: errorMessage,
              });
            } else {
              return ProductActions.loadIndividualProductsSuccess({
                product: productOrError,
              });
            }
          }),
          catchError((error) =>
            of(
              ProductActions.loadIndividualProductsFailure({
                error: error.errorMessage || 'An unknown error occurred',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
