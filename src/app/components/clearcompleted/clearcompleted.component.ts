import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-clearcompleted',
  templateUrl: './clearcompleted.component.html',
  styleUrls: ['./clearcompleted.component.css']
})
export class ClearcompletedComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  clearCompleted(): void {
    this.todoService.clearCompleted()
  }


}
