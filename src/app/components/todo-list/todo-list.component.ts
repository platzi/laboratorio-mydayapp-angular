import { Component, Input } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
import { ITodo } from '@app/models/Todo.model';

@Component({
  selector: 'app-todo-list',
  template: `
  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <ul class="todo-list">
        <app-todo-item
          *ngFor="let todo of todoList;"
          [todo]="todo"
        />
    </ul>
  </section>
  `
})
export class TodoListComponent {
  todoEditing = {
    id: 0,
    editing: false
  };
  constructor (private todoService: TodoService) { }

  todoList$ = this.todoService.todoList$;
  todoList:ITodo[] = []

  @Input()
  set TodoList(value: ITodo[]) {
    this.todoList = value;
  }


}
