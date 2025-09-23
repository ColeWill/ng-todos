import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => {
    console.log(state);
    return state.users;
  },
);
