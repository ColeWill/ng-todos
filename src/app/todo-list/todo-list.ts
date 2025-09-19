import { Component, OnInit, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo-store/todo.model';
import { Store } from '@ngrx/store';
import * as TodoActions from '../todo-store/todo.actions';
import * as TodoSelectors from '../todo-store/todo.selectors';
import { CommonModule } from '@angular/common';
import { TodoListLi } from './todo-list-li/todo-list-li';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoListLi],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  incompleteTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.incompleteTodos$ = this.store.select(
      TodoSelectors.selectIncompleteTodos,
    );
    this.completedTodos$ = this.store.select(
      TodoSelectors.selectCompletedTodos,
    );
    this.error$ = this.store.select(TodoSelectors.selectTodosError);
    this.loading$ = this.store.select(TodoSelectors.selectTodosLoading);
  }

  ngOnInit(): void {}
  fetchTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  onToggleComplete(todoId: number): void {
    console.log('toggle this id:', todoId);
  }
}
