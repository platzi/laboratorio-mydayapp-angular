import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

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
  @Output() removeTodo: EventEmitter<any> = new EventEmitter();
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  updateTodoCompletedStatus(): void {
    this.updateCompletedStatus.emit();
  }

  activateEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    }, 100)
  }

  removeThisTodo(): void {
    this.removeTodo.emit()
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
