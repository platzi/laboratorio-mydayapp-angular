import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  @Input() tasks: Task[] = [];

  constructor() {}

  @Output() updateTask = new EventEmitter<Task>();

  onUpdateTask(task: Task) {
    this.updateTask.emit(task);
  }
}
