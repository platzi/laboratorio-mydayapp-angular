import { Component, 
         OnInit, 
         Input,
         EventEmitter, 
         Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent {
  @Input() todo: Todo = {id: '', title: '', completed: false };
  @Output() cambioVariable = new EventEmitter<string>();

  constructor(private todoService: TodoService) { }

  updateTitle() {
    this.todo.title = this.todo.title.trim();
    this.todoService.editTaskTitle();
    this.cambioVariable.emit("actualizo");
  }

  cancelEdition() {
    this.cambioVariable.emit("cancelo");
  }
}
