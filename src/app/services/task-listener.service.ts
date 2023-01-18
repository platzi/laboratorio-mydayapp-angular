import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarea } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskListenerService {
  private _listTasks = new BehaviorSubject<Tarea[]>([]);
  private _listTasks$ = this._listTasks.asObservable();

  constructor() {}

  getListTasks(): Observable<Tarea[]> {
    return this._listTasks$;
  }

  setListTaks(listTasks: Tarea[]) {
    return this._listTasks.next(listTasks);
  }
}
