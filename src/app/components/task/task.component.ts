import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  editing: boolean = false;
  @Input() index: number = -1;
  @Input() task: Task = {
    id: -1,
    title: '',
    completed: false,
  };
  @Output() updateTasks: EventEmitter<any> = new EventEmitter();

  constructor(private taskManager: TaskManagerService) {}

  toggleTask() {
    this.taskManager.completedTask(this.index);
  }

  removeTask() {
    this.taskManager.removeTask(this.index);
    this.updateTasks.emit();
  }

  updateTitle() {
    this.taskManager.editTaskTitle(this.index, this.task.title);
    this.editing = false;
  }

  cancelEdition() {
    this.editing = false;
  }
}
