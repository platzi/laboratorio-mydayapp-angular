import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TODO } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-todo',
  template: `
    <input
      data-testid="create-todo-input"
      class="new-todo"
      placeholder="Type new todo"
      autofocus
      type="text"
      [formControl]="newTodoDescription"
      (keyup.enter)="createTodo(newTodoDescription.value)"
    />
  `,
  styles: []
})
export class CreateTodoComponent {
  public newTodoDescription: FormControl;
  constructor(
    private _todoService: TodoService
  ) {
    this.newTodoDescription = new FormControl('', [Validators.required]);
  }

  public createTodo(description: string) {
    description = description.trim()
    if(description.length <= 0) {
      return;
    }

    const new_todo: TODO = new TODO(description);
    this._todoService.todos = new_todo;
    this.newTodoDescription.setValue('');
  }
}
