import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { StatusTask } from '../enums/statusTask.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  KEY_STORAGE: string = 'mydayapp-angular';
  tasks: Task[] = [];

  constructor() { }

  saveTaskInStorage(task: Task): void {
    this.tasks = this.getTasksFromStorage;
    this.tasks.push(task);
    console.log('addtasks', this.tasks);
    localStorage.setItem(this.KEY_STORAGE, JSON.stringify(this.tasks));
  }

  get getTasksFromStorage(): Task[] {
    let dataStorage = localStorage.getItem(this.KEY_STORAGE);
    this.tasks = dataStorage ? JSON.parse(dataStorage) : [];
    return this.tasks;
  }

  get thereIsTask() {
    this.tasks = this.getTasksFromStorage;
    return this.tasks.length > 0 ?? true;
  }


  get amountOfPendingTasks() {
    this.tasks = this.getTasksFromStorage;
    return this.tasks.filter(t => !t.completed).length;
  }

  get amountOfCompletedTasks() {
    this.tasks = this.getTasksFromStorage;
    return this.tasks.filter(t => t.completed).length;
  }

  getTask(id: string): Task {
    let tasks: Task[] = this.getTasksFromStorage;
    let task: Task = tasks.find(task => task.id === id)!;
    return task;
  }

  updateTask(task: Task): void {
    this.tasks = this.getTasksFromStorage;
    this.tasks.filter(t => t.id === task.id).forEach(t => {
      t.completed = task.completed;
      t.title = task.title;
    });
    localStorage.setItem(this.KEY_STORAGE, JSON.stringify(this.tasks));
  }

  deleteTask(id: string): void {
    this.tasks = this.getTasksFromStorage;
    let index: number = this.tasks.findIndex(t => t.id === id);
    this.tasks.splice(index, 1);
    localStorage.setItem(this.KEY_STORAGE, JSON.stringify(this.tasks));
  }

  deleteCompletedTaks() {
    this.tasks = this.getTasksFromStorage;
    let pendingTasks = this.tasks.filter(t => !t.completed);
    localStorage.setItem(this.KEY_STORAGE, JSON.stringify(pendingTasks));
  }

  filterTask(filter: StatusTask): Task[] {
    this.tasks = this.getTasksFromStorage;
    if (filter === StatusTask.ALL) {
      return this.tasks;
    }
    let status: boolean = filter === StatusTask.COMPLETED ?? true;
    return this.tasks.filter(t => t.completed === status);
  }
}
