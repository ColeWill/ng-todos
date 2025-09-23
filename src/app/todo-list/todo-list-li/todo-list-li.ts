import { Component, input, output } from '@angular/core';
import { Todo } from '../../store/todo-store/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-li',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list-li.html',
  styleUrl: './todo-list-li.scss',
})
export class TodoListLi {
  todoList = input.required<Todo[]>();
  toggleComplete = output<number>();
}
