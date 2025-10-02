import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoReducer } from './store/todo-store/todo.reducer';
import { userReducer } from './store/user-store/users.reducer';
import { TodosEffects } from './store/todo-store/todo.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UsersEffects } from './store/user-store/users.effects';
import { productReducer } from './store/product-store/products.reducer';
import { ProductsEffects } from './store/product-store/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      todos: todoReducer,
      users: userReducer,
      products: productReducer,
    }),
    provideEffects([TodosEffects, UsersEffects, ProductsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    provideHttpClient(withFetch()),
  ],
};
