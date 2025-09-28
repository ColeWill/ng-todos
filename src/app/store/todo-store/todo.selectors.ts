import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { Todo } from './todo.model';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos,
);

export const selectTodosLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading,
);

export const selectTodosError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error,
);

export const selectCompletedTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos.filter((todo) => todo.completed),
);

export const selectIncompleteTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos.filter((todo) => !todo.completed),
);

export const selectTotalTodosCount = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.length,
);

export const createdAtSortedTodos$ = createSelector(
  selectAllTodos,
  (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return dateB - dateA;
    });
  },
);
