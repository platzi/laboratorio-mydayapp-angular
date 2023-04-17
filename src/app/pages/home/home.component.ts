import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Todo} from "../../models/todo.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {FormControl} from '@angular/forms'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  input = new FormControl('', {nonNullable: true})
  id: number = 0;
  todos: Todo[] = [];
  leftLength: number = 0;
  completedLength: number = 0;
  url: string = '';
  todosToShow: Todo[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.localStorageService.getData().length;
    this.todos = this.localStorageService.getData();
    this.left();
    this.route.paramMap
      .subscribe(params => {
        this.url = params.get('filter') || '';
        this.setFilter()
      })
  }

  addTodo(){
    this.todos.push({
      id: this.id + 1,
      title: this.input.value.trim(),
      completed: false
    })
    this.localStorageService.setLocal(this.todos);
    this.id++;
    this.input.setValue('');
    this.getTodos()
    this.setFilter()
  }
  getTodos(){
    this.todos = this.localStorageService.getData();
    this.left();
  }

  left(){
    this.leftLength = this.todos.filter(todo => !todo.completed).length;
    this.completedLength = this.todos.filter(todo => todo.completed).length;
  }


  updateTodo(task: Todo){
    const index = this.todos.findIndex(todo => todo.id === task.id);
    this.todos[index] = {
      ...this.todos[index],
      ...task
    }
    this.localStorageService.setLocal(this.todos);
    this.todos = this.localStorageService.getData();
    this.setFilter()
    this.left();
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.localStorageService.setLocal(this.todos);
    this.setFilter()
    this.left();
  }

  clearCompleted(){
    this.todos = this.todos.filter(todo => !todo.completed);
    this.localStorageService.setLocal(this.todos);
    this.setFilter()
    this.left();
  }

  setFilter(){
    this.url === 'all' || this.url === '' ? this.todosToShow = this.todos : this.url === 'completed' ? this.todosToShow = this.todos.filter(todo => todo.completed) : this.url === 'pending' ? this.todosToShow = this.todos.filter(todo => !todo.completed) : null
  }
}
