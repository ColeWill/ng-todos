import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../users-list/users.service';
import { UserActions } from '../index';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadUsersFailure } from './user.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message })),
          ),
        ),
      ),
      catchError((error) =>
        of(UserActions.loadUsersFailure({ error: error.message })),
      ),
    ),
  );
}
