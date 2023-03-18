import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  tasks: Task[] = [];

  constructor() {
    let data = localStorage.getItem('mydayapp-angular');
    if (data) {
      this.tasks = JSON.parse(data);
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
      this.saveLocalData();
    }
  }


  getTasks() {
    return this.tasks;
  }
  saveLocalData() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
}
