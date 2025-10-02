import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product, ProductActions, ProductSelectors } from '../../store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  store = inject(Store);
  allProducts$: Observable<Product[]> | null = null;
  latestProduct$: Observable<Product | null> | null = null;
  productState$: Observable<any> = new Observable<any>();

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadIndividualProduct());
    this.productState$ = this.store.select(ProductSelectors.selectProductState);
    this.allProducts$ = this.store.select(ProductSelectors.selectAllProducts);
    this.latestProduct$ = this.store.select(
      ProductSelectors.selectLatestProduct,
    );
  }
}
