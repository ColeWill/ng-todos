import { Component, OnInit, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Todo, TodoSelectors, TodoActions } from '../../store/';

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

  onToggleTodo(todoId: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id: todoId }));
  }
}
