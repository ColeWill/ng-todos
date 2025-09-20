import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import { TodoActions } from '../index';

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
  }),
  on(TodoActions.toggleTodo, (state, { id }) => {
    const mutatedTodos: Todo[] = state.todos.map(
      (todo): Todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    return {
      ...state,
      todos: mutatedTodos,
      loading: false,
      error: null,
    };
  }),
  on(TodoActions.addTodo, (state, { newTodo }) => {
    return {
      ...state,
      todos: [...state.todos, newTodo],
      loading: false,
      error: null,
    };
  }),

  //
);
