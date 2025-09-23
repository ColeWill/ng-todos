import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserSelectors, UserActions } from '../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  private store = inject(Store);
  users$: Observable<User[]>;

  constructor() {
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
  }
}
