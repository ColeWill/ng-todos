import { Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../../store/';
import { TodoActions, TodoSelectors } from '../../store';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoListLi } from '../todo-list/todo-list-li/todo-list-li';

interface SelectOption {
  name: string;
  value: number;
}

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, CommonModule, TodoListLi],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoForm implements OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  todoForm: FormGroup;
  allTodos$: Observable<Todo[]> | undefined;
  totalTodosCount: number | undefined;
  incompleteTodos$: Observable<Todo[]> | undefined;
  recentlyCreatedTodos$: Subject<Todo[]> | [] = [];
  userIdSelects: { value: number; name: string }[] | null = [];

  constructor() {
    this.fetchIncompleteTodos();
    this.todoForm = this.fb.group({
      id: [0],
      todo: ['', [Validators.required, Validators.pattern(/\S+/)]],
      completed: [false],
      userId: [null, [Validators.required]],
    });

    this.fetchAllTodos();
    this.buildUserSelectOptionsList();
    this.store
      .select(TodoSelectors.selectTotalTodosCount)
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.totalTodosCount = count;
      });
  }

  fetchIncompleteTodos() {
    this.incompleteTodos$ = this.store.select(
      TodoSelectors.selectIncompleteTodos,
    );
  }

  fetchAllTodos(): void {
    this.allTodos$ = this.store.select(TodoSelectors.selectAllTodos);
  }

  buildUserSelectOptionsList(): void {
    if (!this.allTodos$) {
      return;
    }
    this.allTodos$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (todos) => {
        const uniqueUserIds = new Set<number>();
        const userOptions: SelectOption[] = [];

        todos.forEach((todo: Todo) => {
          if (!uniqueUserIds.has(todo.userId)) {
            uniqueUserIds.add(todo.userId);
            userOptions.push({
              name: todo.userId.toString(),
              value: todo.userId,
            });
          }
        });
        this.userIdSelects = userOptions.sort((a, b) => a.value - b.value);
      },
      error: (err) => {
        console.error('Error building user Id Select options:', err);
      },
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const createdAt = new Date().toISOString();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      const newTodo: Todo = {
        ...this.todoForm.value,
        id: this.totalTodosCount && this.totalTodosCount,
        createdAt: createdAt,
        dueDate: dueDate.toISOString(),
      };

      this.store.dispatch(TodoActions.addTodo({ newTodo }));
      this.todoForm.reset({ id: 0, todo: '', completed: false, userId: null });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
