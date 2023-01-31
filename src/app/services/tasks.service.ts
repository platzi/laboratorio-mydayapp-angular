import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private myTasks: Task[] = [{id: '1', title: 'hola', completed: false}];
  private tasks = new BehaviorSubject<Task[]>(this.myTasks);
  tasks$ = this.tasks.asObservable();

  constructor() {}
  addTask(title: string) {
    const id: string = Date.now().toString();
    const completed: boolean = false;
    this.myTasks.push({ id, title, completed });
    this.tasks.next(this.myTasks);
  }

  removeTask(id: string) {
    const index = this.myTasks.findIndex((task) => task.id === id);
    this.myTasks.splice(index, 1);
    this.tasks.next(this.myTasks);
  }

  toogleCompleted(id: string, completed: boolean) {
    const index = this.myTasks.findIndex((task) => task.id === id);
    this.myTasks[index] = {
      ...this.myTasks[index],
      completed
    };
    this.tasks.next(this.myTasks);
  }
}
