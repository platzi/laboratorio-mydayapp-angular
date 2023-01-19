import { Component } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks: Task[] = [];

  constructor() {}

  saveTask(task: string): void {
    const newTask: Task = {
      completed: false,
      id: `task-${this.tasks.length + 1}`,
      title: task,
    };
    this.tasks.push(newTask);
  }
}
