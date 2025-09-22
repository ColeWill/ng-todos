import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  delay,
  tap,
  startWith,
} from 'rxjs/operators';
import { TodoActions } from '../index';
import { Todo } from './todo.model';

interface DummyJsonResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable()
export class TodosEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);

  constructor() {
    if (!this.http) {
      console.warn('HttpClient is not injected');
    }
  }

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        if (!this.http) {
          console.error('HttpClient is undefined in TodosEffects');
          return of(
            TodoActions.loadTodosFailure({
              error: 'HttpClient is not available',
            }),
          );
        }
        return this.http
          .get<DummyJsonResponse>('https://dummyjson.com/todos')
          .pipe(
            // startWith([]),
            delay(0),
            map((response) => {
              const updatedTodos = response.todos.map((todo) => {
                const createdAt = new Date().toISOString();
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 7);
                return {
                  ...todo,
                  createdAt,
                  dueDate: dueDate.toISOString(),
                };
              });
              return TodoActions.loadTodosSuccess({ todos: updatedTodos });
            }),
            catchError((error) =>
              of(TodoActions.loadTodosFailure({ error: error.message })),
            ),
          );
      }),
    ),
  );
}
