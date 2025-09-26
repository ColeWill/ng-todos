import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { UsersList } from './components/users-list/users-list';
import { LoginModal } from './components/login-modal/login-modal';

export const paths = {
  TODOS: 'todos',
};

export const routes: Routes = [
  { path: paths.TODOS, component: TodoList },
  { path: 'createTodos', component: TodoForm },
  { path: 'users', component: UsersList },
  { path: 'login', component: LoginModal },
];
