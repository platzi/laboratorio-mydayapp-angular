import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  tasks: Array<Task> = [];
  pending: number = 0;
  completed: number = 0;

  constructor() {
    let data = localStorage.getItem('mydayapp-angular');
    if (data) {
      this.tasks = JSON.parse(data);
      this.updateCounters();
    }
  }

  addTask(title: string) {
    if (title != '') {
      let newTask: Task = {
        id: this.tasks.length,
        title: title.trim(),
        completed: false
      }
      this.tasks.push(newTask);
      this.updateCounters();
      this.saveLocalData();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateCounters();
    this.saveLocalData();
  }

  getTasks() {
    return this.tasks;
  }

  completedTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updateCounters();
    this.saveLocalData();
  }

  editTaskTitle(index: number, newTitle: string) {
    if (newTitle != '') {
      this.tasks[index].title = newTitle.trim();
      this.saveLocalData();
    }
  }

  updateCounters() {
    this.pending = this.tasks.filter(task => !task.completed).length;
    this.completed = this.tasks.filter(task => task.completed).length;
  }

  eraseCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.updateCounters()
    this.saveLocalData();
    return this.tasks;
  }

  saveLocalData() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
}
