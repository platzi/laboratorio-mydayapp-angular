import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ITodo } from '@app/models/Todo.model';
import { TodoService } from '@app/services/todo.service'
import { FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  constructor (private todoService: TodoService) { }

  @Input() todo!: ITodo;
  @Input() id!: number;
  @ViewChild('todoInput') todoInput!: ElementRef;

  todoControl = new FormControl('', Validators.required)
  editing = false

  activeEdit() {
    this.editing = true
    setTimeout(() => {
      this.todoInput.nativeElement.focus();
      const title = this.todoControl.value;
      if (title) {
        this.todoInput.nativeElement.setSelectionRange(title.length, title.length);
      }
    });
  }

  closeEdit() {
    this.editing = false
  }

  updateTodo(event: KeyboardEvent) {
    if (this.todoControl.valid && this.todoControl.value) {
      if (event.key === 'Enter') {
        this.todo.title = this.todoControl.value.trim()
        this.todoService.update(this.id, this.todo)
        this.closeEdit()
      } else if (event.key === 'Escape') {
        this.closeEdit()
      }
    }
  }

  deleteTodo() {
    this.todoService.delete(this.id)
  }

}
