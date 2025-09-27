import { Component, input, OnInit, output } from '@angular/core';
import { Todo } from '../../../store/';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-li',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list-li.html',
  styleUrl: './todo-list-li.scss',
})
export class TodoListLi implements OnInit {
  todoList = input.required<Todo[]>();
  toggleComplete = output<number>();
  newImmutableTodoList!: Todo[];

  ngOnInit() {
    this.newImmutableTodoList = this.todoList().map((todo) => {
      const newTodo: Todo = {
        ...todo,
        timeRemaining: this.calculateTimeRemaining(todo.dueDate),
      };
      return newTodo;
    });
  }

  calculateTimeRemaining(dueDate: any) {
    const endDate = new Date(dueDate);
    const startDate = new Date();

    let delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600);
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60);
    delta -= minutes * 60;

    return {
      days,
      hours,
      minutes,
    };
  }
}
