import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TODO } from '../models/todo.model';


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

  constructor() {
    this._todos = this._getInitialData();
    this._todosSubject = new BehaviorSubject(this._todos);
    this.todos$ = this._todosSubject.asObservable();
  }

  get todos() {
    return [...this._todos];
  }

  get pendingTodos() {
    return this._todos.filter(todo => todo.status === TODOStatus.pending).length;
  }

  set todos(todo: any) {
    this._todos.push(todo);
    this._updateStorage(this._todos);
    this._todosSubject.next(this._todos);
  }

  set deleteTodo(id: any) {
    const todoPos = this._todos.findIndex(todo => todo.id === id);
    this._todos.splice(todoPos, 1);
    this._updateStorage(this._todos);
    this._todosSubject.next(this._todos);
  }

  private _getInitialData(): TODO[]{
    let cached: any[] = window.localStorage.getItem('mydayapp-angular') && JSON.parse(window.localStorage.getItem('mydayapp-angular')!);
    (cached) && (cached = this._convertToTODOS(cached));
    return cached || []
  }

  private _updateStorage(todos: TODO[]) {
    const valueToStore = todos.map(todo => todo.getValues());
    window.localStorage.setItem('mydayapp-angular',JSON.stringify(valueToStore));
  }

  private _clearStorage() {
    window.localStorage.removeItem('mydayapp-angular');
  }

  private _convertToTODOS(cachedData: any[]): TODO[]{
    return cachedData.map(todo => new TODO(todo.description, todo.status))
  }
}
