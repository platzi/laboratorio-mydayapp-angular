import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarea } from '../interfaces/task.interface';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskListenerService {
  private _listTasks = new BehaviorSubject<Tarea[]>(
    this.taskService.getListTask()
  );
  private _listTasks$ = this._listTasks.asObservable();

  constructor(private taskService: TaskService) {}

  getListTasks(): Observable<Tarea[]> {
    return this._listTasks$;
  }

  setListTaks(listTasks: Tarea[]) {
    // Se llama el servicio que guarda en el local storage
    this.taskService.guardarTasks(listTasks);
    return this._listTasks.next(listTasks);
  }
}
