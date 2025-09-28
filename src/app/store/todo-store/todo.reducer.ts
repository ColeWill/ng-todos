import { createReducer, on } from '@ngrx/store';
import { TodoActions, Todo } from '../index';

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
    const mutatedTodos: Todo[] = state.todos.map((todo): Todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });

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
