import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../store';
import { map, Observable } from 'rxjs';

interface DummyJsonResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http
      .get<DummyJsonResponse>('https://dummyjson.com/users')
      .pipe(map((response) => response.users));
  }
}
