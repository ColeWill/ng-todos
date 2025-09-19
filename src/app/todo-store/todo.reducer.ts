import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  error: string | null;
  loading: boolean;
}

export const initialState: TodoState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => {
    return {
      ...state,
      todos,
      loading: false,
      error: null,
    };
  })

  //
);
