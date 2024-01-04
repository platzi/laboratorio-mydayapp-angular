import { Injectable } from '@angular/core';
import { Task, tasksStatusEnum } from '../types/tasks';

@Injectable({
  providedIn: 'root',
})
export class TareasStorageService {
  private key: string = 'mydayapp-angular';
  private _tasksList: Task[] = Array.from<Task>({ length: 0 });

  public gettasksList() {
    if (localStorage.getItem(this.key)) {
      this._tasksList = JSON.parse(localStorage.getItem(this.key) || '[]');
    }
    return this._tasksList;
  }

  private settasksList() {
    localStorage.setItem(this.key, JSON.stringify(this._tasksList));
  }

  public getPendingTasks() {
    return this.gettasksList().filter((t) => !t.completed);
  }

  public getCompletedTasks() {
    return this.gettasksList().filter((t) => t.completed);
  }

  public addTarea(tarea: Task) {
    if (this.isTittleValid(tarea)) {
      tarea.title = tarea.title.trim();
      this._tasksList.push(tarea);
      this.settasksList();
      return true;
    }
    return false;
  }

  public updateTarea(tarea: Task) {
    const index = this._tasksList.findIndex((t) => t.id === tarea.id);
    if (index !== -1) {
      tarea.title = tarea.title.trim();
      this._tasksList[index] = tarea;
      this.settasksList();
      return true;
    }
    return false;
  }

  public deleteTarea(tarea: Task) {
    const index = this._tasksList.findIndex((t) => t.id === tarea.id);
    if (index !== -1) {
      this._tasksList.splice(index, 1);
      this.settasksList();
      return true;
    }
    return false;
  }

  public filterTasks(filter: tasksStatusEnum) {
    if (filter === tasksStatusEnum.COMPLETED) {
      return this.gettasksList().filter((t) => t.completed);
    } else if (filter === tasksStatusEnum.PENDING) {
      return this.gettasksList().filter((t) => !t.completed);
    }
    return this.gettasksList();
  }

  public clearCompletedTask() {
    this._tasksList = this.gettasksList().filter((t) => !t.completed);
    this.settasksList();
  }

  private isTittleValid(tarea: Task) {
    return tarea.title.trim().length > 0;
  }

  get hasTasks() {
    return this.gettasksList().length > 0;
  }

  get countTasks() {
    return this.gettasksList().length;
  }

  get countPendingTasks() {
    return this.gettasksList().filter((t) => !t.completed).length;
  }

  get countCompletedTasks() {
    return this.gettasksList().filter((t) => t.completed).length;
  }

  get biggerID() {
    if (!this.hasTasks) {
      return 0;
    }
    const list = this.gettasksList().sort(
      (a: Task, b: Task) => parseInt(a.id) - parseInt(b.id)
    );
    return parseInt(list[list.length - 1].id);
  }
}
