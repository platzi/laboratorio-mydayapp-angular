import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  save(tasks: Task[]) {
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
  }

  load(): Task[] {
    const storedTasks = localStorage.getItem('mydayapp-angular');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
}
