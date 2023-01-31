import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private myTasks: Task[] = [];
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {}

  getTasks() {
    const tasks = localStorage.getItem('mydayapp-angular');
    if (tasks) {
      this.myTasks = JSON.parse(tasks);
      this.tasks.next(this.myTasks);
    }
  }

  saveTasks() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.myTasks));
  }

  addTask(title: string) {
    const id: string = Date.now().toString();
    const completed: boolean = false;
    this.myTasks.push({ id, title, completed });
    this.tasks.next(this.myTasks);
    this.saveTasks();
  }

  removeTask(id: string) {
    const index = this.myTasks.findIndex((task) => task.id === id);
    this.myTasks.splice(index, 1);
    this.tasks.next(this.myTasks);
    this.saveTasks();
  }

  toogleCompleted(id: string, completed: boolean) {
    const index = this.myTasks.findIndex((task) => task.id === id);
    this.myTasks[index] = {
      ...this.myTasks[index],
      completed,
    };
    this.tasks.next(this.myTasks);
    this.saveTasks();
  }

  editTask(id: string, title: string) {
    const index = this.myTasks.findIndex((task) => task.id === id);
    this.myTasks[index] = {
      ...this.myTasks[index],
      title,
    };
    this.tasks.next(this.myTasks);
    this.saveTasks();
  }

  clearCompleted() {
    this.myTasks = this.myTasks.filter((task) => !task.completed);
    this.tasks.next(this.myTasks);
    this.saveTasks();
  }
}
