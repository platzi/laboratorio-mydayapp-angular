import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';
import { TaskManagerService } from 'src/app/core/services/task-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  taskTitle: string = '';
  tasks: Task[] = [];

  constructor(private taskManager: TaskManagerService) {
    this.tasks = this.taskManager.getTasks();
  }

  ngOnInit(): void {
  }

  addNewTask() {
    this.taskManager.addTask(this.taskTitle);
    this.taskTitle = '';
  }

  getPending() {
    return this.taskManager.pending;
  }
}
