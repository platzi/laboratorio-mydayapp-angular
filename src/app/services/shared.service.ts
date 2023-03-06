import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private todosData = new BehaviorSubject<Array<Todo>>([]);
  private todoPendientes = new BehaviorSubject<number>(0);
  todoPendientes$ = this.todoPendientes.asObservable();

  private todoCompleted = new BehaviorSubject<number>(0);
  todoCompleted$ = this.todoCompleted.asObservable();

  private currentRoute = new BehaviorSubject<string>('all');
  currentRoute$ = this.currentRoute.asObservable();

  getTodosData() {
    return this.todosData.asObservable();
  }

  setTodosData(todos: Array<Todo>) {
    this.todosData.next(todos);
  }

  actualizarTodoPendientes(nuevoValor: number) {
    this.todoPendientes.next(nuevoValor);
  }

  actualizarTodoCompleted(nuevoValor: number) {
    this.todoCompleted.next(nuevoValor);
  }

  actualizarCurrentRoute(currentRoute: string) {
    this.currentRoute.next(currentRoute);
  }
}
