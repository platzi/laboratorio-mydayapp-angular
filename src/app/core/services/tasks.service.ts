import { Injectable } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  getAllTasks(): Task[] {
    const listTasks: Task[] = [];
    const listTasksString = localStorage.getItem('mydayapp-angular');
    if (listTasksString) {
      return JSON.parse(listTasksString);
    }
    return listTasks;
  }

  private saveAllTasks(listTasks: Task[]): void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(listTasks));
  }

  addTask(taskName: string): Task[] {
    const listTasks = this.getAllTasks();
    const task: Task = {
      id: listTasks.length + 1,
      name: taskName,
      completed: false
    };
    listTasks.push(task);
    this.saveAllTasks(listTasks);
    return listTasks;
  }

  deleteTask(task: Task): Task[] {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.filter(t => t.id !== task.id);
    this.saveAllTasks(listTasks);
    return listTasks;
  }

  updateStateTask(task: Task): Task[] {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.map(t => {
      if (t.id === task.id) {
        t.completed = !t.completed;
      }
      return t;
    });
    this.saveAllTasks(listTasks);
    return listTasks;
  }

  updateNameTask(task: Task): Task[] {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.map(t => {
      if (t.id === task.id) {
        t.name = task.name;
      }
      return t;
    });
    this.saveAllTasks(listTasks);
    return listTasks;
  }
}
