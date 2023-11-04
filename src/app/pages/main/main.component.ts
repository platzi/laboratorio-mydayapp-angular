import { Component, Input } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  @Input() listTasks: Task[] = [];

  isCompleted = false;

  constructor() { }

  isTaskCompleted(task: Task): boolean {
    return task.completed;
  }

}
