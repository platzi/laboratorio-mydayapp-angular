import { Injectable } from '@angular/core';
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksStorageService {

  private storageKey = 'mydayapp-angular';

  constructor() {}

  get(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  update(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

}
