import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[] = [];
  private _todos$ = new BehaviorSubject<Todo[]>(this._todos);

  constructor(private storageService: StorageService) {}

  initApp(): void {
    this._todos.push(new Todo('hello world 1'));
    this._todos.push(new Todo('hello world 2'));
    this._todos.push(new Todo('hello world 3'));
    this.save();
  }

  getTodos() {
    return this._todos$.asObservable();
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

  private save(): void {
    this._todos$.next(this._todos);
    this.storageService.setTodos(this._todos);
  }
}
