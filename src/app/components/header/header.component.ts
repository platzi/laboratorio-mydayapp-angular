import { Component } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  template:`
  <header class="header">
  <div class="container">
    <h1>My Day</h1>
    <p>All my tasks in one place</p>
    <input
      class="new-todo"
      placeholder="Type new todo"
      autofocus
      [formControl]="todoControl"
      type="text"
      (keydown.enter)="createTodo()"
    />
  </div>
</header>
`
})

export class HeaderComponent {

  constructor (private todoService: TodoService) { }

  todoControl = new FormControl('', Validators.required);
  todoList$ = this.todoService.todoList$;

  createTodo() {
    if (this.todoControl.valid && this.todoControl.value) {
      this.todoService.create(this.todoControl.value.trim());
      this.todoControl.setValue('')
    }
  }

}
