import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoForm } from './todo-form/todo-form';

export const routes: Routes = [
  { path: 'todos', component: TodoList },
  { path: 'createTodos', component: TodoForm },
];
