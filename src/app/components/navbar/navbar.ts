import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { paths } from '../../app.routes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService = inject(AuthService);
  protected readonly title = signal('todos-ng');
  isDropdownOpen = signal(false);

  componentLinks: { text: string; routerLink: string }[] = [
    {
      text: 'Todo List Component',
      routerLink: paths.TODOS_LIST,
    },
    {
      text: 'Create Todos',
      routerLink: paths.TODO_FORM,
    },
    {
      text: 'users',
      routerLink: paths.USERS,
    },
  ];

  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  onLogout(): void {
    this.authService.logout();
  }
}
