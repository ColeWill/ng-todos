import { Injectable } from '@angular/core';
import { from, map, Observable, concatMap, of, delay, catchError } from 'rxjs';
import { Product } from './product.model';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  getProductsInInterval(): Observable<Product> {
    // const productIds = Array.from({ length: 31 }, (_, i) => i + 1);
    const productIds = ['x', 'y', 30, 31, 32, 1];

    const productUrls = productIds.map((id) => `${this.apiUrl}/${id}`);

    return from(productUrls).pipe(
      concatMap((url: string, index: number) => {
        const delay$ = index > 0 ? of(null).pipe(delay(15000)) : of(null);

        return delay$.pipe(
          concatMap(() =>
            ajax<any>(url).pipe(
              map(
                (response: AjaxResponse<any>) => response.response as Product,
              ),
              catchError((error) => of(error)),
            ),
          ),
        );
      }),
    );
  }
}
