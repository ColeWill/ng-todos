import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  private currentAccessToken: string | null = null;
  private LOGIN_URL = 'https://dummyjson.com/auth/login';

  constructor() {}

  public getAccessToken(): string | null {
    return this.currentAccessToken ? this.currentAccessToken : null;
  }

  public login(credentials: any) {
    return this.http
      .post<AuthResponse>(this.LOGIN_URL, {
        ...credentials,
        expiresInMins: 30,
      })
      .pipe(
        tap((response) => {
          this.currentAccessToken = response.accessToken;
          this.loggedInSubject.next(true);
        }),
        catchError((error) => {
          console.error('Error logging in:', error);
          return throwError(() => new Error('Invalid username or password'));
        }),
      );
  }

  public logout(): void {
    this.currentAccessToken = null;
    this.loggedInSubject.next(false);
  }
}
