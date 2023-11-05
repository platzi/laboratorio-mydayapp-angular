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

  getTasksByStatus(status: string): Task[] {
    const listTasks = this.getAllTasks();
    if (status === 'pending') {
      return listTasks.filter(t => !t.completed);
    } else if (status === 'completed') {
      return listTasks.filter(t => t.completed);
    }
    return listTasks;
  }

  private saveAllTasks(listTasks: Task[]): void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(listTasks));
  }

  addTask(taskName: string): void {
    const listTasks = this.getAllTasks();
    const task: Task = {
      id: listTasks.length + 1,
      name: taskName,
      completed: false
    };
    listTasks.push(task);
    this.saveAllTasks(listTasks);
  }

  deleteTask(task: Task): void {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.filter(t => t.id !== task.id);
    this.saveAllTasks(listTasks);
  }

  deleteCompletedTasks(): void {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.filter(t => !t.completed);
    this.saveAllTasks(listTasks);
  }

  changeStatusTask(task: Task): void {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.map(t => {
      if (t.id === task.id) {
        t.completed = !t.completed;
      }
      return t;
    });
    this.saveAllTasks(listTasks);
  }

  updateNameTask(task: Task, newName: string): void {
    let listTasks = this.getAllTasks();
    listTasks = listTasks.map(t => {
      if (t.id === task.id) {
        t.name = newName;
      }
      return t;
    });
    this.saveAllTasks(listTasks);
  }
}
