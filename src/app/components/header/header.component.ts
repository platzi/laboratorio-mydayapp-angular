import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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

export class HeaderComponent implements OnInit {

  constructor (private todoService: TodoService) { }
  @ViewChild('todoInput') todoInput!: ElementRef;

  todoControl = new FormControl('', Validators.required);
  todoList$ = this.todoService.todoList$;
ngOnInit(){
  this.todoInput.nativeElement.focus();
}
  createTodo() {
    if (this.todoControl.valid && this.todoControl.value) {
      this.todoService.create(this.todoControl.value.trim());
      this.todoControl.setValue('')
    }
  }

}
