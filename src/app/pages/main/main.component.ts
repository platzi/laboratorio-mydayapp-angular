import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  @Input() listTasks: Task[] = [];
  @Output() changeStatus = new EventEmitter<Task>();

  isCompleted = false;

  isTaskCompleted(task: Task): boolean {
    return task.completed;
  }

  changeStatusTask(task: Task): void {
    this.changeStatus.emit(task);
  }

}
