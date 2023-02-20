import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Todo, todoFilter } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[] = [];
  private _todos$ = new BehaviorSubject<Todo[]>(this._todos);

  private _filter: todoFilter = 'all';
  private _filter$ = new BehaviorSubject<todoFilter>(this._filter);

  constructor(private storageService: StorageService) {}

  getTodos() {
    return this._todos$.asObservable();
  }

  getFilter() {
    return this._filter$.asObservable();
  }

  addTodo(todo: Todo) {
    this._todos = [...this._todos, todo];
    this.save();
  }

  removeTodo(id: string) {
    this._todos = this._todos.filter((todo) => todo.id !== id);
    this.save();
  }

  toggle(id: string) {
    this._todos = this._todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.save();
  }

  editTodo(id: string, title: string) {
    this._todos = this._todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    this.save();
  }

  getPendingTodos() {
    return this.getTodos().pipe(
      map((todos) => todos.filter((todo) => !todo.completed))
    );
  }

  getCompletedTodos() {
    return this.getTodos().pipe(
      map((todos) => todos.filter((todo) => todo.completed))
    );
  }

  clearCompleted() {
    this._todos = this._todos.filter((todo) => !todo.completed);
    this.save();
  }

  setFilter(filter: todoFilter) {
    this._filter = filter;
    this._filter$.next(this._filter);
    this._todos$.next(this._todos);
  }

  readStorage() {
    this._todos = this.storageService.getTodos();
    this.save();
  }

  private save(): void {
    this._todos$.next(this._todos);
    this.storageService.setTodos(this._todos);
  }
}
