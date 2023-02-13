import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TODO } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent {

  @Input() todo!: TODO;

  @Output() deleteTodo: EventEmitter<void>;
  @Output() updateStatus: EventEmitter<void>;
  @Output() updateTodo: EventEmitter<void>;
  @Output() cancelEdit: EventEmitter<void>;

  constructor() {
    this.deleteTodo = new EventEmitter();
    this.updateStatus = new EventEmitter();
    this.updateTodo = new EventEmitter();
    this.cancelEdit = new EventEmitter();
  }
}
