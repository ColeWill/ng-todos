import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductActions } from '..';
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
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({ error: error.errorMessage }),
            ),
          ),
        ),
      ),
    ),
  );
}
