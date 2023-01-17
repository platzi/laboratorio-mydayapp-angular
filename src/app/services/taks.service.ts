import { Task } from '../interfaces/task.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaksService {
  private _listTasks = new BehaviorSubject<Task[]>([]);
  private _listTasks$ = this._listTasks.asObservable();

  constructor() {}

  getListTasks(): Observable<Task[]> {
    return this._listTasks$;
  }

  setListTaks(listTasks: Task[]) {
    return this._listTasks.next(listTasks);
  }
}
