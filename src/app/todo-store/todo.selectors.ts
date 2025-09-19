import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodosError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

export const selectCompletedTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos.filter((todo) => todo.completed)
);

export const selectIncompleteTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos.filter((todo) => !todo.completed)
);
