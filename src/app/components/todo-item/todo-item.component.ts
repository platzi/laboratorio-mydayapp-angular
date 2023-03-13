import { Component, Input, ViewChild, ElementRef} from '@angular/core';
import { ITodo } from '@app/models/Todo.model';
import { TodoService } from '@app/services/todo.service'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  constructor (private todoService: TodoService) { }

  @Input() todo!: ITodo;
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
    },0);
  }

  checked(){
    this.todo.completed=!this.todo.completed
    this.todoService.update(this.todo.id, this.todo)
  }

  closeEdit() {
    this.editing = false
  }

  updateTodo() {
    if (this.todoControl.valid && this.todoControl.value) {
        this.todo.title = this.todoControl.value.trim()
        this.todoService.update(this.todo.id, this.todo)
        this.closeEdit()
    }
  }

  deleteTodo() {
    this.todoService.delete(this.todo.id)
  }

}
