import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  editing: boolean = false;
  @Input() index: number = -1;
  @Input() task: Task = {
    id: -1,
    title: '',
    completed: false
  }

  constructor(private taskManager: TaskManagerService) { }

  ngOnInit(): void {
  }

  toggleTask() {
    this.taskManager.completedTask(this.index);
  }

  removeTask() {
    this.taskManager.removeTask(this.index);
  }

  updateTitle() {
    this.taskManager.editTaskTitle(this.index, this.task.title);
    this.editing = false;
  }

  cancelEdition() {
    this.editing = false;
  }

}
