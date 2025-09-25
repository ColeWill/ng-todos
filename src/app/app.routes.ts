import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { UsersList } from './components/users-list/users-list';

export const routes: Routes = [
  { path: 'todos', component: TodoList },
  { path: 'createTodos', component: TodoForm },
  { path: 'users', component: UsersList },
];
