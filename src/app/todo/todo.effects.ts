import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError, delay, tap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

interface DummyJsonResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      tap(() => console.log('Loading todos from API....')),
      mergeMap(() =>
        this.http.get<DummyJsonResponse>('https://dummyjson.com/todos').pipe(
          delay(500),
          map((response) =>
            TodoActions.loadTodosSuccess({ todos: response.todos })
          ),
          catchError((error) => {
            console.error('Error loading todos:', error);
            return of(
              TodoActions.loadTodosFailure({
                error: 'Failed to load todos. Please try again',
              })
            );
          })
        )
      )
    )
  );
}
