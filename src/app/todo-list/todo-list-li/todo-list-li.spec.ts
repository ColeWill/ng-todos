import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListLi } from './todo-list-li';

describe('TodoListLi', () => {
  let component: TodoListLi;
  let fixture: ComponentFixture<TodoListLi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListLi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListLi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
