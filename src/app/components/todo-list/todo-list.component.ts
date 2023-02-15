import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [],
})
export class TodoListComponent implements OnInit {
  todos$ = this.todoService.getTodos();

  constructor(
    private storageService: StorageService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.storageService.clear();
    this.todoService.initApp();
    this.todoService.getTodos();
  }
}
