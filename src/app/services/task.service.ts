import { Injectable } from '@angular/core';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): ITask[] {
    var arrayTask = localStorage.getItem('mydayapp-angular');

    if (arrayTask !== null) {
      return JSON.parse(arrayTask);
    }

    return [];
  }

  saveTasks(tasks: ITask[]): void {
    localStorage.removeItem('mydayapp-angular');
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
  }

}
