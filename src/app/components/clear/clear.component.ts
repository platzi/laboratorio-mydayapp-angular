import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.css']
})
export class ClearComponent {

  completedTodos$ = this.todoService.getTodosCompleted();
  constructor(private todoService: TodoService) { }

  onClear() {
    this.todoService.clearCompleted();
  }

}
