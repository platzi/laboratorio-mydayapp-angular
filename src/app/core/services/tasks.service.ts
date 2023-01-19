import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

const LOCAL_STORAGE_KEY = 'mydayapp-angular';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  get tasks(): Task[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  set tasks(tasksData: Task[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksData));
  }
}
