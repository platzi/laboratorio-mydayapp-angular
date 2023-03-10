import { Component } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
