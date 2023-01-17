import { Tarea } from '../interfaces/task.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaksService {
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
