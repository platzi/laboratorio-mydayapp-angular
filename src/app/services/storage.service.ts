import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storageKey = 'mydayapp-angular';

  constructor() {}

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(this._storageKey) as any) || '[]';
  }

  setTodos(todos: Todo[]): void {
    localStorage.setItem(this._storageKey, JSON.stringify(todos));
  }

  clear(): void {
    localStorage.setItem(this._storageKey, '');
  }
}
