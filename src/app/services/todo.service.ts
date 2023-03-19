import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TODO } from '../models/todo.model';
import { TodoStatus } from '../utils/types/todo-status.type';


export enum TODOStatus {
  completed = 'completed',
  pending = 'pending'
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos: TODO[];
  private _todosSubject: BehaviorSubject<TODO[]>;
  public todos$: Observable<TODO[]>;
  public filter: TodoStatus;

  constructor() {
    this._todos = this._getInitialData();
    this._todosSubject = new BehaviorSubject(this._todos);
    this.todos$ = this._todosSubject.asObservable();
    this.filter = '';
  }

  getTodosFilter(appliedFilter:'completed' | 'pending' | '') {
    return this.todos$.pipe(
      map(val => {
        this.filter = appliedFilter;
        if (appliedFilter === 'pending') {
          return val.filter(resp => !resp.completed)
        } else if (appliedFilter === 'completed') {
          return val.filter(resp => resp.completed)
        } else {
          return val;
        }
      })
    )
  }
  get todosQuantity() {
    return this._todos.length;
  }
  get pendingTodos() {
    return this._todos.filter(todo => !todo.completed).length
  }
  get completedTodos() {
    return this._todos.filter(todo => todo.completed).length
  }
  set todos(todo: TODO) {
    this._todos.push(todo);
    this._updateStorage(this._todos);
    this._todosSubject.next(this._todos);
  }
  set updateTodos(todos: TODO[]) {
    this._todos = todos;
    this._updateStorage(this._todos);
    this._todosSubject.next(this._todos)
  }
  set deleteTodo(id: number) {
    const todoPos = this._todos.findIndex(todo => todo.id === id);
    this._todos.splice(todoPos, 1);
    this._updateStorage(this._todos);
    this._todosSubject.next(this._todos);
  }

  private _getInitialData(): TODO[]{
    let cached: any[] = window.localStorage.getItem('mydayapp-angular') && JSON.parse(window.localStorage.getItem('mydayapp-angular')!);
    (cached) && (cached = this.convertToTODOS(cached));
    return cached || []
  }

  private _updateStorage(todos: TODO[]) {
    const valueToStore = todos.map(todo => todo.getValues());
    window.localStorage.setItem('mydayapp-angular',JSON.stringify(valueToStore));
  }

  public clearStorage() {
    window.localStorage.removeItem('mydayapp-angular');
  }

  public convertToTODOS(cachedData: any[]): TODO[]{
    return cachedData.map(todo => new TODO(todo.title, todo.completed))
  }

  public removeCompletedTodos() {
    this._todos = this._todos.filter(todo => !todo.completed);
    this.updateTodos = this._todos;
  }
}
