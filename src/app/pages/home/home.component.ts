import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/services/todo.service'
import { ITodo } from '@app/models/Todo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
  <section class="todoapp">
    <app-header/>
    <div class="container todoapp-wrapper">
      <app-todo-list *ngIf="todoLength"  [TodoList]="todoList" />
      <app-footer *ngIf="todoLength"  />
    </div>
  </section>
  `,
})

export class HomeComponent implements OnInit {
  todoLength = 0
  currentList = this.todoService.currentList;
  todoList: ITodo[] = [];
  currentRoute: string = '';
  sub!: any;

  constructor (private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.todoService.todoList$.subscribe(data => {
      this.todoLength = data.length
      this.todoList = data
    })
    this.sub = this.route.url.subscribe(url => {
      if (url.length === 0) {
        this.currentRoute = 'all';
      } else {
        this.currentRoute = url[0].path;
      }
      this.filterTodos(this.currentRoute);
    });
  }

  filterTodos(filter: string) {
    switch (filter) {
      case 'all':
        this.todoList;
        break;
      case 'pending':
        this.todoList = this.currentList.filter(todo => todo.completed === false)
        break;
      case 'completed':
        this.todoList = this.currentList.filter(todo => todo.completed === true)
        break;
      default:
        this.todoList;
        break;
    }
  }
}
