import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';

  getTodos(): Observable<Todo[]> {
    return ajax<any>(this.apiUrl).pipe(
      map((response: AjaxResponse<any>) => response.response.todos as Todo[]),
    );
  }
}
