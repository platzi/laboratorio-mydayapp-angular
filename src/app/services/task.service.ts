import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getListTask() {
    const list = localStorage.getItem('mydayapp-angular');
    const listTask = list ? JSON.parse(list) : [];
    return listTask;
  }

  guardarTasks(listTask: Tarea[]) {
    const data = JSON.stringify(listTask);
    localStorage.setItem('mydayapp-angular', data);
  }
}
