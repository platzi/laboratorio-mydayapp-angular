import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/pages/home/todo.model';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent {

  isEditMode: boolean = false;
  @Input() todo!: Todo;
  @Output() updateCompletedStatus: EventEmitter<any> = new EventEmitter();
  @Output() updateTodoTitle: EventEmitter<string> = new EventEmitter();

  constructor() { }

  updateTodoCompletedStatus(): void {
    this.todo.completed = !this.todo.completed;
    this.updateCompletedStatus.emit();
  }

  activateEditMode(): void {
    this.isEditMode = true;
  }

  handleEditInput(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.isEditMode = false;
    const value = (event.target as HTMLInputElement).value;
    if (event.key !== 'Enter' || value === '') return;
    const cleanValue = value.trim();
    this.todo.title = cleanValue;
    this.updateTodoTitle.emit(cleanValue);
    this.isEditMode = false;
  }

}
