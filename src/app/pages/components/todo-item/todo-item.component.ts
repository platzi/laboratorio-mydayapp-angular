import { Component, Input } from '@angular/core';
import { ITodo } from '@app/models/Todo.model';
import { TodoService } from '@app/services/todo.service'
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  constructor (private todoService: TodoService) { }
  editing = false
  @Input() todo!: ITodo;
  @Input() id!: number;

  deleteTodo() {
    this.todoService.delete(this.id)
  }
}
