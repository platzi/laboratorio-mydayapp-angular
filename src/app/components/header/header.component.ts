import { Component, 
         Input, 
         OnInit, 
         EventEmitter, 
         Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() todos: Array<Todo> = [];
  @Output() cambioTodoList = new EventEmitter<number>();
  public todoTitle: string = '';
  variable = 1;

  constructor(private todoService: TodoService,
              ) { }


  async addNewTask() {
    this.todoService.addTask(this.todoTitle, this.todos);
    this.cambioTodoList.emit(this.variable);
    this.todoTitle = '';
  }
}
