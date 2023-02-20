import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { todoFilter } from 'src/app/models/todo.model';
import { StorageService } from 'src/app/services/storage.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [],
})
export class TodoListComponent implements OnInit {
  todos$ = this.todoService.getTodos();
  currentFilter$ = this.todoService.getFilter();

  constructor(
    private storageService: StorageService,
    private todoService: TodoService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.storageService.clear();
    this.todoService.initApp();
    this.todoService.getTodos();
    this.activatedRouter.paramMap.subscribe((params) => {
      const filter = params.get('filter') as todoFilter;
      this.todoService.setFilter(filter);
    });
  }
}
