import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { paths } from '../../app.routes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
})
export class LoginModal implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  @Input() isVisible: boolean = false;
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean | false = false;
  isLoggedIn!: boolean | false;
  TODOS_PATH: string = paths.TODOS;
  private subscriptions!: Subscription;
  private authLoginSubscription!: Subscription;
  private isLoggedInSubscription!: Subscription;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required],
    });

    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (val) => {
        this.isLoggedIn = val;
      },
    );

    this.subscriptions.add(this.isLoggedInSubscription);
  }
  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched;
    }
    this.isLoading = true;
    this.authLoginSubscription = this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          this.router.navigate([`${this.TODOS_PATH}`]);
        },
        error: (response) => {
          this.isLoading = false;
          this.errorMessage = response.message || 'an unknown error occurred';
          console.error(response.message);
        },
      });
    this.subscriptions.add(this.authLoginSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
