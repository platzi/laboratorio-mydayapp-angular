import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/services/todo.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  todoLength=0
  todoList$ = this.todoService.todoList$;

  constructor (private todoService: TodoService) { }


  ngOnInit() {
    this.todoList$.subscribe(todoList => {
      this.todoLength=todoList.length
    })
  }
}
