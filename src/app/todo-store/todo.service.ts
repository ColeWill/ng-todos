import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, interval, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, switchMap, startWith } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';

  getTodos(): Observable<Todo[]> {
    return ajax<any>(this.apiUrl).pipe(
      map((response: AjaxResponse<any>) => response.response.todos as Todo[])
    );
  }
}
