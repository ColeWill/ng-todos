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
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.http.get<{ todos: Todo[] }>('https://dummyjson.com/todos').pipe(
          map((response) =>
            TodoActions.loadTodosSuccess({ todos: response.todos })
          ),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
