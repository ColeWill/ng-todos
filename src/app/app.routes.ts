import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoForm } from './todo-form/todo-form';
import { UsersList } from './users-list/users-list';

export const routes: Routes = [
  { path: 'todos', component: TodoList },
  { path: 'createTodos', component: TodoForm },
  { path: 'users', component: UsersList },
];
