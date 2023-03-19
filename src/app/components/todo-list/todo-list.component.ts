import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TODO } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent {

  @Input() todos!: TODO[];
  @Output() updateStatus: EventEmitter<TODO>;
  @Output() updateTodo: EventEmitter<TODO>;
  @Output() cancelEdit: EventEmitter<void>;
  @Output() deleteTodo: EventEmitter<number>;

  constructor() {
    this.updateStatus = new EventEmitter();
    this.updateTodo = new EventEmitter();
    this.cancelEdit = new EventEmitter();
    this.deleteTodo = new EventEmitter();
  }
}
