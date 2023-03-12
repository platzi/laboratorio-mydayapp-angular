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
          (todoEditing)="handleValueChange($event)"
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

  handleValueChange(value: any) {
    this.todoEditing = value;
    this.todoService.todoList$.subscribe((value) => {
      if (this.todoEditing.editing) {
        const todoItem = value.find((v) => v.id == this.todoEditing.id)
        let todo: ITodo[] = []
        if (todoItem) {
          todo = [todoItem]
          this.todoList = todo
        }
      }else{
        this.todoList = value
      }
    })
  }

}
