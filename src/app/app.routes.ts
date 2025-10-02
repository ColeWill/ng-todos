import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { UsersList } from './components/users-list/users-list';
import { LoginModal } from './components/login-modal/login-modal';
import { NotFound } from './components/not-found/not-found';
import { Products } from './components/products/products';

export const paths = {
  TODOS_LIST: 'todos',
  TODO_FORM: 'createTodos',
  USERS: 'users',
  LOGIN: 'login',
  PRODUCTS: 'products',
};

export const routes: Routes = [
  { path: paths.TODOS_LIST, component: TodoList },
  { path: paths.TODO_FORM, component: TodoForm },
  { path: paths.USERS, component: UsersList },
  { path: paths.LOGIN, component: LoginModal },
  { path: paths.PRODUCTS, component: Products },
  { path: '**', component: NotFound },
];
