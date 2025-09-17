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
  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Math.max(...state.todos.map((t) => t.id), 0) + 1,
        text,
        completed: false,
        userId: 1,
      },
    ],
  }))

  //
);
