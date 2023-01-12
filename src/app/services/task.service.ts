import { Injectable } from '@angular/core';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): ITask[] {
    var arrayTask = localStorage.getItem('tasks');

    if (arrayTask !== null) {
      return JSON.parse(arrayTask);
    }

    return [];
  }

  addTask(tasks: ITask[]): void {
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
