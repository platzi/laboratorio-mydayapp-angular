

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todos } from '../models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorageKeyName = 'mydayapp-angular';
  private listOfTodos: Todos[] = [];
  private todoReactiveStorage: BehaviorSubject<Todos[]>;
  todoReactiveStorage$!: Observable<Todos[]>;
  constructor() {
    this.todoReactiveStorage = new BehaviorSubject<Todos[]>([]);
    this.todoReactiveStorage$ = this.todoReactiveStorage.asObservable();
  }

  //Utils:
  findIndexById(idParameter: string): number {
    return this.listOfTodos.findIndex((todo) => todo.id == idParameter);
  }

  fillListTodos(): void {
    this.listOfTodos = JSON.parse(localStorage.getItem(this.localStorageKeyName)!) ? JSON.parse(localStorage.getItem(this.localStorageKeyName)!) : [];
    this.todoReactiveStorage.next(this.listOfTodos);
  }
  addTodo(tempNewTodo: string): void {
    let newTodo = {
      id: this.listOfTodos.length > 0
        ? String(Math.max.apply(null, this.listOfTodos.map(todo => Number(todo.id))) + 1) //If there are 10 items, the new todo should have the id 11
        : '1', //if the array is empty the initial id will be 1
      title: tempNewTodo,
      completed: false                    //It starts by default on false
    };

    this.listOfTodos = [...this.listOfTodos, {...newTodo}];
    this.updateTodos();
  }
  updateStatus(idParameter: string): void {
    let index = this.findIndexById(idParameter);
    this.listOfTodos[index].completed = !this.listOfTodos[index].completed;
    this.updateTodos();
  }
  deleteTodo(idParameter: string): void {
    this.listOfTodos.splice(this.findIndexById(idParameter), 1);
    this.updateTodos();
  }
  clearCompleted() {
    this.listOfTodos = this.listOfTodos.filter(todo => todo.completed == false);
    this.updateTodos();
  }
  updateTodos(): void {
    this.todoReactiveStorage.next(this.listOfTodos);

    localStorage.removeItem(this.localStorageKeyName);
    localStorage.setItem(this.localStorageKeyName, JSON.stringify(this.listOfTodos));
  }
  updateTodoTitle(newTodoTitle: string, idParameter: string): void {
    this.listOfTodos[this.findIndexById(idParameter)].title = newTodoTitle;
    this.updateTodos();
  }
}

