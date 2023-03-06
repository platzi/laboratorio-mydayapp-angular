import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { SharedService } from 'src/app/services/shared.service';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent  {
  @Input() todo: Todo = {id: '', title: '', completed: false };
  editing: boolean = false;

  constructor(private todoService: TodoService,
              private sharedService: SharedService) { }

  toggleTask() {
    this.todoService.completedTask(this.todo)
    this.sharedService.actualizarTodoPendientes(this.todo.completed ? -1 : 1);
    this.sharedService.actualizarTodoCompleted(this.todo.completed ? 1 : -1);
  }

  actualizarValor(nuevoValor: any) {
    this.editing = false;
  }
}
