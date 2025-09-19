import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo-store/todo.model';
import { Store } from '@ngrx/store';
import * as TodoActions from '../todo-store/todo.actions';
import * as TodoSelectors from '../todo-store/todo.selectors';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {
  todos$: Observable<Todo[]>;
  // loading: Observable<boolean>;
  // error$: Observable<string | null>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.todos$.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
