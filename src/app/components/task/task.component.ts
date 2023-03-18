import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import { TaskManagerService } from 'src/app/core/services/task-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task = {
    id: -1,
    title: '',
    completed: false
  }
  @Input() index: number = -1;
  @Output() updateTasks: EventEmitter<any> = new EventEmitter();
  editing: boolean = false;

  constructor( private taskManager: TaskManagerService ) { }

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
