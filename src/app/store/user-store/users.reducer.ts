import { createReducer, on } from '@ngrx/store';
import { User, UserActions } from '../index';

export interface UserState {
  users: User[];
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users,
      loading: false,
      error: null,
    };
  }),
);
