import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, map } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [] as Task[];
  private $tasks = new BehaviorSubject<Task[]>(this.tasks);

  private filter: Filter = 'all';
  private filterBS = new BehaviorSubject<Filter>(this.filter);
  constructor(private localstorageService: LocalstorageService) { }

  private save() {
    this.$tasks.next(this.tasks);
    this.localstorageService.setStorage(this.tasks);
  }

  createTask(title: string) {
    const serilizeTitle = title.trim();
    if (serilizeTitle.length === 0) {
      return;
    }
    const newTask = {
      id: new Date().getMilliseconds().toString(),
      title: serilizeTitle,
      completed: false
    }
    this.tasks = [...this.tasks, newTask]
    this.save();
  }


  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

  updateTask(id: string, updateTask: Task) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...updateTask,
        };
      }
      return task;
    });
    this.save();
  }

  getTask(id: string) {
    return this.tasks.find((task) => task.id === id)
  }

  readStorage() {
    this.tasks = this.localstorageService.getStorage();
    this.save();
  }

  getTasks() {
    return this.$tasks.asObservable();
  }

  toggle(id: Task['id']): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.save();
  }

  getPendingTasks() {
    return this.getTasks().pipe(
      map((tasks) => tasks.filter((task) => !task.completed))
    );
  }

  getCompletedTasks() {
    return this.getTasks().pipe(
      map((tasks) => tasks.filter((task) => task.completed))
    );
  }

  changeFilter(change: Filter) {
    this.filter = change;
    this.filterBS.next(change);
    this.$tasks.next(this.tasks);
  }

  getTasksByFilter() {
    return this.getTasks().pipe(
      map((tasks) => {
        if (this.filter === 'pending') {
          return tasks.filter((task) => !task.completed);
        }
        if (this.filter === 'completed') {
          return tasks.filter((task) => task.completed);
        }
        return tasks;
      })
    );
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.save();
  }

  getFilter() {
    return this.filterBS.asObservable();
  }
}
